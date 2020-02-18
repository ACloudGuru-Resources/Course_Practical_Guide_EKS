def validate_json(json):
    required_fields = ['Name', 'DateOfPublication', 'Type', 'Author', 'Description']
    missing_fields = []

    for key in required_fields:
        if key not in json.keys():
            missing_fields.append(key)
        elif json[key] == "":
            missing_fields.append(key)

    if len(missing_fields) > 0:
        if len(missing_fields) == 1:
            message = "The field '" + missing_fields[0] + "' is missing or empty"
        else:
            message = "The fields '" + ', '.join(missing_fields) + "' are missing or empty"
        return False, message
    
    return True, 'Valid'