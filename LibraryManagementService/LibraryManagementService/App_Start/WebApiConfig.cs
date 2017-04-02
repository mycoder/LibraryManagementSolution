using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json.Serialization;
using System.Web.Http.Cors;
using System.Web.Routing;

namespace LibraryManagementService
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            //config.EnableCors(new EnableCorsAttribute(System.Net.Http.Properties.Settings.Default.Cors, "", ""));
            //var corsAttr = new EnableCorsAttribute("http://localhost:1935", "*", "*");
            //var corsAttr = new EnableCorsAttribute("http://localhost:17798", "*", "*");
              //config.EnableCors(corsAttr); 

            // Configure Web API to use only bearer token authentication.
            config.SuppressDefaultHostAuthentication();
            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute("DefaultApiWithId", "Api/{controller}/{id}", new { id = RouteParameter.Optional }, new { id = @"\d+" });
            config.Routes.MapHttpRoute("DefaultApiWithAction", "Api/{controller}/{action}");
            config.Routes.MapHttpRoute("DefaultApiGet", "Api/{controller}", new { action = "Get" });
            config.Routes.MapHttpRoute("DefaultApiPost", "Api/{controller}", new { action = "Post" });
            config.Routes.MapHttpRoute("DefaultApiPut", "Api/{controller}", new { action = "Put" });
            config.Routes.MapHttpRoute("DefaultApiDelete", "Api/{controller}", new { action = "Delete" });
          
         
        }
    }
}
