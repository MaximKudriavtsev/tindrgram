using System;
using System.IO;
using System.Text;

using Newtonsoft.Json;

using Amazon.Lambda.Core;
using Amazon.Lambda.DynamoDBEvents;
using Amazon.DynamoDBv2.Model;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;
using System.Collections.Generic;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using System.Configuration;
using Amazon.Geo.Model;
using Amazon.Geo;
using Amazon;
using Amazon.Runtime;
using System.Linq;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class. 
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.Json.JsonSerializer))]

namespace GetPhotoFunction
{
    public class Function
    {
        readonly IAmazonDynamoDB _dbClient;
        private GeoDataManager _geoDataManager;
        private GeoDataManagerConfiguration _config;
        const double distention = 0.009009009;

        public Function()
        {
            _dbClient = new AmazonDynamoDBClient();
            SetupGeoDataManager();
        }

        public Function(IAmazonDynamoDB dynamoDB)
        {
            _dbClient = dynamoDB;
        }

        private void SetupGeoDataManager()
        {
            //var accessKey = ConfigurationManager.AppSettings["AWS_ACCESS_KEY_ID"];
            //var secretKey = ConfigurationManager.AppSettings["AWS_SECRET_KEY"];
            //var tableName = ConfigurationManager.AppSettings["PARAM1"];
            //var regionName = ConfigurationManager.AppSettings["PARAM2"];
            var tableName = "Photo";
            //var regionName = ConfigurationManager.AppSettings["PARAM2"];


            //var region = RegionEndpoint.GetBySystemName(regionName);
            //var config = new AmazonDynamoDBConfig { MaxErrorRetry = 20, RegionEndpoint = region };


            ////var creds = new BasicAWSCredentials(accessKey, secretKey);


            //bool useLocalDb;
            //bool.TryParse(ConfigurationManager.AppSettings["AWS_USE_LOCAL_DB"], out useLocalDb);

            //if (useLocalDb)
            //{
            //    var localDB = ConfigurationManager.AppSettings["AWS_LOCAL_DYNAMO_DB_ENDPOINT"];
            //    config.ServiceURL = localDB;
            //}

            var ddb = new AmazonDynamoDBClient();
            //var ddb = new AmazonDynamoDBClient(creds, config);

            _config = new GeoDataManagerConfiguration(ddb, tableName);
            _geoDataManager = new GeoDataManager(_config);

        }

        public async Task<string> FunctionHandler(UserLocation input, ILambdaContext context)
        {
            context.Logger.LogLine($"Enter to {context.FunctionName}...");

            input.max_lng = input.lng + distention;
            input.max_lat = input.lat + distention;

            using (var dbContext = new DynamoDBContext(_dbClient))
            {
                context.Logger.LogLine($"Create context {context.FunctionName}...");

                var scan = new List<ScanCondition>();

                //var photoList = await dbContext.ScanAsync<PhotoData>(scan).GetRemainingAsync();               
                var location = input;
                context.Logger.LogLine("Stream processing complete.");
                var result = await QueryRectangle(location);

                return result;
                //return JsonConvert.SerializeObject(photoList);
            }

        }

        public async Task<string> QueryRectangle(UserLocation query)
        {
            //if (!ModelState.IsValid)
            //    return Json("{\"result\":\"Bad Request\"}", JsonRequestBehavior.AllowGet);

            var min = new GeoPoint(query.lat, query.lng);
            var max = new GeoPoint(query.max_lat, query.max_lng);


            var attributesToGet = new List<string>
            {
                "id", "imgUrl", "lng", "lat"                
            };

            var radReq = new QueryRectangleRequest(min, max);
            //radReq.QueryRequest.AttributesToGet = attributesToGet;

            var result = await _geoDataManager.QueryRectangleAsync(radReq);
            
            var dtos = GetResultsFromQuery(result);



            return JsonConvert.SerializeObject(dtos);
        }

        private IEnumerable<PhotoData> GetResultsFromQuery(GeoQueryResult result)
        {
            var dtos = from item in result.Items
                       let geoJsonString = item[_config.GeoJsonAttributeName].S
                       let point = JsonConvert.DeserializeObject<GeoPoint>(geoJsonString)
                       select new PhotoData
                       {
                           id = item[_config.RangeKeyAttributeName].S,
                           lat = point.Latitude.ToString(),
                           lng = point.Longitude.ToString(),
                           imgUrl = item.ContainsKey("imgUrl") ? item["imgUrl"].S : string.Empty
                       };

            return dtos;
        }

        public class UserLocation
        {
            public UserLocation() {
            }
            public UserLocation(string input)
            {
                JObject jObject = JObject.Parse(input);
                lat = (double)jObject["lat"];
                lng = (double)jObject["lng"];
                max_lng = lng + distention;
                max_lat = lat + distention;
            }

            public double lng { get; set; }
            public double lat { get; set; }
            public double max_lng { get; set; }
            public double max_lat { get; set; }
        }

        [DynamoDBTable("Photo")]
        class PhotoData
        {
            [DynamoDBHashKey]
            public string id { get; set; }
            public string imgUrl { get; set; }
            public string lng { get; set; }
            public string lat { get; set; }
            //[DynamoDBRangeKey]
            //public string Location { get; set; }
        }

    }
}
