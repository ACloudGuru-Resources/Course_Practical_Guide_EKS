require 'aws-sdk'
require 'securerandom'
require 'net/http'
require 'json'

class RentingController < ApplicationController
    @@dynamodb = Aws::DynamoDB::Client.new
    
    @@table_name = ENV['DYNAMODB_TABLE'] == nil ?
        'development-renting' : ENV['DYNAMODB_TABLE']

    @@inventory_api_endpoint = ENV['INVENTORY_API_ENDPOINT'] == nil ? 
        'http://localhost:5001' : ENV['INVENTORY_API_ENDPOINT']
    
    @@clients_api_endpoint = ENV['CLIENTS_API_ENDPOINT'] == nil ? 
        'http://localhost:5003' : ENV['CLIENTS_API_ENDPOINT']

    @@resources_api_endpoint = ENV['RESOURCES_API_ENDPOINT'] == nil ?
        'http://localhost:5000' : ENV['RESOURCES_API_ENDPOINT']

    def list
        scan_params = {
            table_name: @@table_name
        }
        begin
            result = @@dynamodb.scan(scan_params)
            puts result
            @response = { 
                "items" => result[:items],
                "count" => result[:count]
            }
        rescue Aws::DynamoDB::Errors::ServiceError => error
            @response = { "message" => "#{error.message}" }
        end
    end

    def list_by_client_id
        returned = params[:returned] == nil ? "false" : params[:returned].to_s
        filter_expression = returned == "true" ? "#ci = :ci and #r = :r" : "#ci = :ci and attribute_not_exists(#r)"

        expression_attribute_names = { "#ci" => "ClientId", "#r" => "Returned" }

        expression_attribute_values = returned == "true" ?
            { ":ci" => params[:id], ":r" => true } : { ":ci" => params[:id] }

        puts "The expression values: "
        puts expression_attribute_values
        puts "RETURNED? #{returned}"
        puts "filter expression: #{filter_expression}"

        scan_params = {
            table_name: @@table_name,
            filter_expression: filter_expression,
            expression_attribute_names: expression_attribute_names,
            expression_attribute_values: expression_attribute_values
        }
        begin
            result = @@dynamodb.scan(scan_params)
            puts result
            for i in 0..result[:items].length()-1 do
                result[:items][i]["ResourceName"] = get_resource_name_by_id(result[:items][i]["ResourceId"])
            end

            @response = { 
                "items" => result[:items],
                "count" => result[:count]
            }
        rescue Aws::DynamoDB::Errors::ServiceError => error
            @response = { "message" => "#{error.message}" }
        end
    end

    def register
        safe_params = params.permit(:ResourceId, :ClientId, :RegistrationDate, :ReturnDate, :CopyId)
        registry = safe_params.to_hash
        registry['_id'] = SecureRandom.uuid

        # Validate that the resource exists and it has copies available
        inventory_url = URI("#{@@inventory_api_endpoint}/list/#{registry['ResourceId']}")
        inventory_api_response = Net::HTTP.get_response(inventory_url)

        json_inventory_api_response = JSON.parse(inventory_api_response.body)
        
        if json_inventory_api_response["Count"] == 0 then
            @response = { "message" => "The resource is not available."}
            return 
        end
        registry['CopyId'] = json_inventory_api_response["Items"][0]["_id"]

        
        # Validate that the client exists
        # uri = URI(@@clients_api_endpoint)
        # http = Net::HTTP.new(uri.hostname, uri.port)
        # request = Net::HTTP::Get.new("/get/#{registry['ClientId']}")
        # request["Content-Type"] = "application/json"
        # response = http.request(request)
        
        # clients_url = URI("#{@@clients_api_endpoint}/get/#{registry['ClientId']}")
        # clients_api_response = Net::HTTP.get_response(clients_url)

        # if clients_api_response.code == "404" then
        #     puts "here"
        #     @response = { "message" => "The client doesn't exist."}
        #     return
        # end

        put_parameters = {
            table_name: @@table_name,
            item: registry
        }
        begin
            @@dynamodb.put_item(put_parameters)
        rescue Aws::DynamoDB::Errors::ServiceError => error
            @response = { "message" => "#{error.message}" }
        end

        # Set the Copy unavailable
        set_copy_availability(registry['CopyId'], false)
        
        @response = registry
    end

    def return
        copy_id = get_copy_id_by_renting_id(params[:id])

        update_params = {
            table_name: @@table_name,
            key: {
                "_id": params[:id]
            },
            update_expression: "SET ReturnDate = :r, Returned = :re",
            expression_attribute_values: {
                ":r" => params["ReturnDate"],
                ":re" => true
            }
        }

        begin
            @@dynamodb.update_item(update_params)
            set_copy_availability(copy_id, true)
            @data = {"message" => "The copy with ID #{copy_id} has been returned."}
        rescue Aws::DynamoDB::Errors::ServiceError => error
            @data = {"message" => "#{error.message}"}
        end
    end

    def get_copy_id_by_renting_id(renting_id)
        begin
            get_params = {
                table_name: @@table_name,
                key: {
                    "_id": renting_id
                }
            }
            result = @@dynamodb.get_item(get_params)
            return result.item['CopyId']
        rescue Aws::DynamoDB::Errors::ServiceError => error
            @data = {"message" => "#{error.message}"}
        end
    end

    def set_copy_availability(copy_id, available)
        uri = URI(@@inventory_api_endpoint)
        http = Net::HTTP.new(uri.hostname, uri.port)
        request = Net::HTTP::Put.new("/setAvailability/#{copy_id}")
        request.body = "{ \"Available\" : #{available} }"
        request["Content-Type"] = "application/json"

        response = http.request(request)
        puts "availability response"
        puts response
    end

    def get_resource_name_by_id(resource_id)
        uri = URI("#{@@resources_api_endpoint}/get/#{resource_id}")
        resources_response = Net::HTTP.get_response(uri)
        resource = JSON.parse(resources_response.body)

        return resource['Name']
    end
end