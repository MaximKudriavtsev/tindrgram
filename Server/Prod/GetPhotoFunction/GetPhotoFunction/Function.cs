using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;
using Amazon.Geo;
using Amazon.Geo.Model;
using Amazon.Lambda.APIGatewayEvents;
using Amazon.Lambda.Core;

using Newtonsoft.Json;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class. 
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.Json.JsonSerializer))]

namespace GetPhotoFunction
{
  public partial class Function
  {
    private GeoDataManager _geoDataManager;
    private GeoDataManagerConfiguration _config;
    private string _tableName = "prod-photo";

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

    public async Task<APIGatewayProxyResponse> FunctionHandler(APIGatewayProxyRequest input, ILambdaContext context)
    {
      context.Logger.LogLine($"Enter to {context.FunctionName}. Params {JsonConvert.SerializeObject(input)}");
      double lat = 1, lng = 1, radius = 2000;

      var success = input.QueryStringParameters.TryGetValue("lat", out var latStr);
      if (success)
      {
        lat = Double.Parse(latStr);
      }

      success = input.QueryStringParameters.TryGetValue("lng", out var lngStr);
      if (success)
      {
        lng = Double.Parse(lngStr);
      }

      success = input.QueryStringParameters.TryGetValue("radius", out var radiusStr);
      if (success)
      {
        radius = Double.Parse(radiusStr);
      }

      QueryRadiusResult queryResult;
      var centerPoint = new GeoPoint(lat, lng);

      var attributesToGet = new List<string>
      {
          _config.RangeKeyAttributeName,
          _config.GeoJsonAttributeName,
          "imgUrl"
      };

      try
      {
        var radReq = new QueryRadiusRequest(centerPoint, radius);
        radReq.QueryRequest.AttributesToGet = attributesToGet;

        queryResult = await _geoDataManager.QueryRadiusAsync(radReq);
      }
      catch (Exception e)
      {
        throw;
      }

      var result = GetResultsFromQuery(queryResult);
      var serializedResult = JsonConvert.SerializeObject(result);
      context.Logger.LogLine($"Get dots: ({serializedResult})");


      return CreateResponse(serializedResult);
    }

    APIGatewayProxyResponse CreateResponse(string result)
    {
      var headers = new Dictionary<string, string>();
      headers.Add("Access-Control-Allow-Origin", "*");
      headers.Add("Access-Aontrol-Allow-Methods", "GET, HEAD, OPTIONS");
      headers.Add("Content-Type", "application/json");
      headers.Add("X-Content-Type-Options", "nosniff");

      return new APIGatewayProxyResponse
      {
        Body = JsonConvert.SerializeObject(result),
        StatusCode = 200,
        Headers = headers
      };
    }

    private IEnumerable<PhotoData> GetResultsFromQuery(GeoQueryResult result)
    {
      var dtos = from item in result.Items
                 let geoJsonString = item[_config.GeoJsonAttributeName].S
                 let point = JsonConvert.DeserializeObject<GeoPoint>(geoJsonString)
                 select new PhotoDataModel
                 {
                   rangeKey = item[_config.RangeKeyAttributeName].S,
                   lat = point.Latitude,
                   lng = point.Longitude,
                   imgUrl = item.ContainsKey("imgUrl") ? item["imgUrl"].S : string.Empty
                 };

      return dtos;
    }

    public class UserLocation
    {
      public double lng { get; set; }
      public double lat { get; set; }
      public double radius { get; set; }
    }

    [DynamoDBTable("Photo")]
    class PhotoData
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
}
