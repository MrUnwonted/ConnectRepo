package com.shopme.common;

//public class Constants {
//	public static final String S3_BASE_URI;
//
//	static {
//		String bucketName = System.getenv("AWS_BUCKET_NAME");
//		String region = System.getenv("AWS_REGION");
//		String pattern = "https://%s.s3.%s.amazonaws.com";
//
//		S3_BASE_URI = bucketName == null ? "" : String.format(pattern, bucketName, region);
//	}
//}

import java.util.Map;

public class Constants {

	public static final String S3_BASE_URI;

	static {

		Map<String, String> env = System.getenv();
		for (String key : env.keySet())
		{
			System.out.println(key + ":" + env.get(key));
		}

		String bucketName = System.getenv("AWS_BUCKET_NAME");
		System.out.println("bucket Name: " + bucketName);
		String region = System.getenv("AWS_REGION");
		System.out.println("Region : " + region);
		String pattern = "https://%s.s3.%s.amazonaws.com";
		S3_BASE_URI = bucketName == null ? "" : String.format(pattern, bucketName, region);;
		System.out.println("Base URI is: " + S3_BASE_URI);
		System.out.println("Hi");
	}

}
