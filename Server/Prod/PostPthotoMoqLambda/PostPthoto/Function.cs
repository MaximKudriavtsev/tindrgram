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
using Amazon.Geo;
using Amazon.Geo.Model;
// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.Json.JsonSerializer))]

namespace PostPthoto
{
  public class Function
  {
    private GeoDataManager _geoDataManager;
    private GeoDataManagerConfiguration _config;
    private string _tableName = "prod-photo";
    //readonly IAmazonDynamoDB _dbClient;

    public Function()
    {
      Init();
    }

    public Function(IAmazonDynamoDB dynamoDB)
    {
      Init();
    }

    private void Init()
    {
      var ddb = new AmazonDynamoDBClient();
      _config = new GeoDataManagerConfiguration(ddb, _tableName);
      _geoDataManager = new GeoDataManager(_config);
    }

    public async Task<string> FunctionHandler(ResponseSourse json, ILambdaContext context)
    {
      context.Logger.LogLine($"Beginning to process {context.FunctionName} records...");
      var photoJsonData = json;
      //return "";
      context.Logger.LogLine($"Create context {context.FunctionName}...");

      var config = new GeoDataManagerConfiguration(new AmazonDynamoDBClient(), _tableName);
      var ddb = new AmazonDynamoDBClient();
      _config = new GeoDataManagerConfiguration(ddb, _tableName);
      _geoDataManager = new GeoDataManager(_config);

      var items = photoJsonData.response.items.ToList();
      for (int i = 0; i < items.Count; i++)
      {
        var item = items.ElementAt(i);
        var imgUrl = item.sizes.FirstOrDefault(x => x.type == "p")?.url;
        var imgUrlLarge = item.sizes.FirstOrDefault(x => x.type == "w")?.url;

        if (String.IsNullOrEmpty(imgUrl) || String.IsNullOrEmpty(imgUrlLarge))
          continue;

        var guid = Guid.NewGuid();
        var latitude = item.lat;
        var longitude = item.@long;

        var point = new GeoPoint(latitude, longitude);

        var rangeKeyVal = new AttributeValue { S = guid.ToString() };
        var imgUrlVal = new AttributeValue { S = imgUrl };
        var imgUrlLargeVal = new AttributeValue { S = imgUrlLarge };

        var req = new PutPointRequest(point, rangeKeyVal);
        req.PutItemRequest.Item["imgUrl"] = imgUrlVal;
        req.PutItemRequest.Item["imgUrlLarge"] = imgUrlLargeVal;

        await _geoDataManager.PutPointAsync(req);
      }

      context.Logger.LogLine("Stream processing complete.");
      return true.ToString();
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
    public double @long { get; set; }
  }

  public class Size
  {
    public string type { get; set; }
    public string url { get; set; }
    public int width { get; set; }
    public int height { get; set; }

  }

  [DynamoDBTable("prod-photo")]
  class Photo
  {
    [DynamoDBHashKey]
    public long hashKey { get; set; }
    public long geohash { get; set; }
    public string geoJson { get; set; }
    public string rangeKey { get; set; }
    public string imgUrl { get; set; }
    public string imgUrlLarge { get; set; }
  }

  class PhotoDataModel : PhotoData
  {
    public double lat { get; set; }
    public double lng { get; set; }
  }
}
