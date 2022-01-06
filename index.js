/**
 * Starts up a pre-configured compute instance when the correct key is provided.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
 const {GoogleAuth} = require('google-auth-library');

 const {google} = require('googleapis');
 var compute = google.compute('v1');
 
 exports.computeInstanceStart = async (req, res) => {
   const key = req.body.key || req.query.key || undefined;
   if(key != process.env.KEY) {
     res.status(401).send("Unauthorized - must specify correct key");
     return;
   }
 
   const auth = new google.auth.GoogleAuth({
     scopes: ["https://www.googleapis.com/auth/compute"],
   });
   const client = await auth.getClient();
   const project = await auth.getProjectId();
   const zone = process.env.ZONE;
   const instance = process.env.INSTANCE;
 
   var request = {
     project: project,
     zone: zone,
     instance: instance,
     auth: client,
   };
  
   try {
     await compute.instances.start(request);
   } catch(e) {
     console.error(JSON.stringify({error: e}));
     res.status(500).send("Error");
     return;
   }
 
   res.status(200).send("OK"); 
  };
  