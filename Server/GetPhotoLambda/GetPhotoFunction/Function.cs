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

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class. 
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.Json.JsonSerializer))]

namespace GetPhotoFunction
{
    public class Function
    {
        readonly IAmazonDynamoDB _dbClient;

        public Function()
        {
            _dbClient = new AmazonDynamoDBClient();
        }

        public Function(IAmazonDynamoDB dynamoDB)
        {
            _dbClient = dynamoDB;
        }

        public async Task<string> FunctionHandler(ILambdaContext context)
        {
            context.Logger.LogLine($"Enter to {context.FunctionName}...");

            using (var dbContext = new DynamoDBContext(_dbClient))
            {
                context.Logger.LogLine($"Create context {context.FunctionName}...");

                var scan = new List<ScanCondition>();

                var photoList = await dbContext.ScanAsync<PhotoData>(scan).GetRemainingAsync();                

                context.Logger.LogLine("Stream processing complete.");

                return JsonConvert.SerializeObject(photoList);
            }

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