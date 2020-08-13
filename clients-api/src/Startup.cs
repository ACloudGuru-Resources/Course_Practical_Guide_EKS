using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using ACG.EKS.Bookstore.Clients_API.Models;
using ACG.EKS.Bookstore.Clients_API.Services;
using Microsoft.Extensions.Options;
using Amazon.XRay.Recorder.Core;
using Amazon.XRay.Recorder.Handlers.AwsSdk;

namespace ACG.EKS.Bookstore.Clients_API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            AWSXRayRecorder.InitializeInstance(configuration: Configuration); // Inititalizing Configuration object with X-Ray recorder
            AWSSDKHandler.RegisterXRayForAllServices(); // All AWS SDK requests will be traced
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // requires using Microsoft.Extensions.Options
            services.Configure<DynamoDBSettings>(
                Configuration.GetSection(nameof(DynamoDBSettings)));

            services.AddSingleton<IDynamoDBSettings>(sp =>
                sp.GetRequiredService<IOptions<DynamoDBSettings>>().Value);

            services.AddSingleton<ClientService>();

            services.AddControllers()
                .AddNewtonsoftJson(options => options.UseMemberCasing());
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }


            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
            app.UseXRay("Clients API");
            app.UseExceptionHandler("/Error");
            app.UseStaticFiles();
        }
    }
}