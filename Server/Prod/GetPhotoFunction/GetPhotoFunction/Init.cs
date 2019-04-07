using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.Model;
using Amazon.Geo;
using Amazon.Geo.Model;
using Amazon.Geo.Util;

using System;
using System.Threading.Tasks;

namespace GetPhotoFunction
{
  public partial class Function
  {
    private async Task InsertData()
    {
      var guid = Guid.NewGuid();
      var imgUrl = "https://s3.eu-central-1.amazonaws.com/tindergramphotosbacket/kreml_small.jpg";
      var imgUrlLarge = "https://s3.eu-central-1.amazonaws.com/tindergramphotosbacket/kreml.jpg";
      var latitude = 54.1896866;
      var longitude = 37.5893742;

      var point = new GeoPoint(latitude, longitude);

      var rangeKeyVal = new AttributeValue { S = guid.ToString() };
      var imgUrlVal = new AttributeValue { S = imgUrl };
      var imgUrlLargeVal = new AttributeValue { S = imgUrlLarge };

      var req = new PutPointRequest(point, rangeKeyVal);
      req.PutItemRequest.Item["imgUrl"] = imgUrlVal;
      req.PutItemRequest.Item["imgUrlLarge"] = imgUrlLargeVal;

      await _geoDataManager.PutPointAsync(req);
    }

    private async Task CreateTable()
    {
      var config = new GeoDataManagerConfiguration(new AmazonDynamoDBClient(), _tableName);
      try
      {
        var ctr = GeoTableUtil.GetCreateTableRequest(config);

        var ddb = new AmazonDynamoDBClient();
        _config = new GeoDataManagerConfiguration(ddb, _tableName);
        _geoDataManager = new GeoDataManager(_config);

        await config.DynamoDBClient.CreateTableAsync(ctr);
        await InsertData();
      }
      catch (Exception)
      {
        throw;
      }
    }
  }
}
