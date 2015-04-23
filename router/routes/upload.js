var express    = require("express"),
		bodyParser = require("body-parser"),
		morgan     = require('morgan'),
		router     = express.Router(),
		aws			 	 = require('aws-sdk');

router.use(morgan("dev"));
router.use(bodyParser.json({limit: "50mb"}));
router.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

router.get('/sign_s3', function(req, res){
    aws.config.update({accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY});
    var s3 = new aws.S3();
    var s3_params = {
        Bucket: 'skillmix',
        Key: req.query.s3_object_name,
        Expires: 60,
        ContentType: req.query.s3_object_type,
        ACL: 'public-read'
    };
    s3.getSignedUrl('putObject', s3_params, function(err, data){
        if(err){
            console.log(err);
        }
        else{
            var return_data = {
                signed_request: data,
                url: 'https://' + s3_params.Bucket + '.s3.amazonaws.com/' + req.query.s3_object_name
            };
            res.write(JSON.stringify(return_data));
            res.end();
        }
    });
});

module.exports = router;