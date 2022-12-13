using Amazon.Runtime.Internal.Auth;
using Amazon.S3;
using Amazon.S3.Model;
using el_proyecte_grande.Models;

namespace el_proyecte_grande.Services;

public class PhotoService
{
    private readonly IAmazonS3 _s3Client;
    
    public PhotoService(IAmazonS3 s3Client)
    {
        _s3Client = s3Client;
    }
    
    public async Task<Photo> DownloadPhotosForProductAsync(int productId)
    {
        var bucketName = "whatnot-rent-project";
        
        var bucketExists = await _s3Client.DoesS3BucketExistAsync(bucketName);
        if (!bucketExists) throw new ArgumentException("Bucket doesn't exists");
        var request = new ListObjectsV2Request
        {
            BucketName = bucketName,
            Prefix = productId.ToString()
        };
        var result = await _s3Client.ListObjectsV2Async(request);
        var s3Objects = result.S3Objects.Select(s =>
        {
            var urlRequest = new GetPreSignedUrlRequest
            {
                BucketName = bucketName,
                Key = s.Key,
                Expires = DateTime.UtcNow.AddMinutes(1)
            };
            return _s3Client.GetPreSignedURL(urlRequest);
        });
        
        var test = new Photo { ProductId = productId, URLs = s3Objects.ToList() };
        return test;
    }
}