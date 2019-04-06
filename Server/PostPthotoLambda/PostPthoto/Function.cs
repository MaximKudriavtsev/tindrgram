using System;
using System.IO;
using System.Text;

using Newtonsoft.Json;

using Amazon.Lambda.Core;
using Amazon.Lambda.DynamoDBEvents;
using Amazon.DynamoDBv2.Model;
using Amazon.DynamoDBv2;
using System.Collections.Generic;
using System.Threading.Tasks;
using Amazon.DynamoDBv2.DataModel;
using Amazon.DynamoDBv2.DocumentModel;
using System.Linq;
// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.Json.JsonSerializer))]

namespace PostPthoto
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

    public async Task<string> FunctionHandler(ResponseSourse json, ILambdaContext context)
    {
      context.Logger.LogLine($"Beginning to process {context.FunctionName} records...");
      var photoJsonData = json;

      using (var dbContext = new DynamoDBContext(_dbClient))
      {
        context.Logger.LogLine($"Create context {context.FunctionName}...");

        var items = photoJsonData.response.items.ToList();
        for(int i = 0; i < items.Count; i++)
        {
          var item = items.ElementAt(i);
          var largSize = item.sizes.FirstOrDefault(x => x.type == "w");
          if (largSize == null)
            continue;

          await dbContext.SaveAsync<Photo>(new Photo()
          {
            id = item.id,
            imgUrl = largSize.url,
            lat = item.lat.ToString(),
            lng = item.@long.ToString(),
          });
        }

        context.Logger.LogLine("Stream processing complete.");

        return true.ToString();
      }
    }

  }

  public class PhotoData
  {
    public Response response { get; set; }
  }
  public class ResponseSourse
  {
    public Response response { get; set; }
  }

  public class Response
  {
    public IEnumerable<Item> items { get; set; }
  }

  public class Item
  {
    public int id { get; set; }
    public IEnumerable<Size> sizes { get; set; }
    public double lat { get; set; }
    public double @long {get;set;}
  }

  public class Size
  {
    public string type { get; set; }
    public string url { get; set; }
    public int width { get; set; }
    public int height { get; set; }

  }

  [DynamoDBTable("Photo")]
  public class Photo
  {
    [DynamoDBHashKey]
    public int id { get; set; }
    public string imgUrl { get; set; }
    public string lng { get; set; }
    public string lat { get; set; }
    //[DynamoDBRangeKey]
    //public string Location { get; set; }
  }
}
