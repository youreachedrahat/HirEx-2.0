const axios = require("axios");
const AWS = require("aws-sdk");
const fs = require("fs");

// Configure the AWS SDK
AWS.config.update({
  accessKeyId: "AKIAZDLBSW43BYEZWGFD",
  secretAccessKey: "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",
  region: "ap-south-1",
});

// Create an instance of the Rekognition service
const rekognition = new AWS.Rekognition();

// Function to detect faces in an image
function Emotion_Detection_Function(req, res, next) {
  const imageUrl = req.body.imageUrl;
  // console.log(imageUrl)

  // Fetch the image using Axios
  axios
    .get(imageUrl, { responseType: "arraybuffer" })
    .then((response) => {
      // Save the image buffer to a local file
      fs.writeFileSync("temp_image.jpg", response.data);

      // Read the local image file
      const imageBytes = fs.readFileSync("temp_image.jpg");

      // Create parameters for the DetectFaces API
      const params = {
        Image: {
          Bytes: imageBytes,
        },
      };

      // Call the DetectFaces API
      rekognition.detectFaces(params, (err, data) => {
        // Cleanup: Delete the temporary image file
        fs.unlinkSync("temp_image.jpg");

        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          res.json({ result: data.FaceDetails });
        }
      });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
}


module.exports = {
  Emotion_Detection_Function,
};
