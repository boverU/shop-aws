import * as AWS from "aws-sdk";
import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

const S3 = new AWS.S3({ region: process.env.BUCKET_REGION, signatureVersion: 'v4', });

const importProductsFile: ValidatedEventAPIGatewayProxyEvent<unknown> = async (event) => {

    console.log("importProductsFile\n" + JSON.stringify(event, null, 2))

    try {
        const fileName = event.queryStringParameters.name;
        if (!fileName) {
            return formatJSONResponse(400, "Name did not provided");
        }

        const filePath = `uploaded/${fileName}`;

        const params = {
            Key: filePath,
            Bucket: process.env.BUCKET_NAME,
            Expires: 360,
            ContentType: "text/csv",
        };

        const result = await S3.getSignedUrlPromise("putObject", params);

        return formatJSONResponse(200, result);

    } catch (error) {
        console.log("Error", error);
        return formatJSONResponse(500, "Failed to get url");
    }
};

export const main = middyfy(importProductsFile);