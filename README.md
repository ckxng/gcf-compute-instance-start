# gcf-compute-instance-start
Start a pre-defined instance from a Google Cloud Function.

The following environment variables should be set within the Function:
- KEY - the pre-shared key that will be passed in the authorize the request
- ZONE - the zone of the instance to start
- INSTANCE - the instance ID of the instance to start
