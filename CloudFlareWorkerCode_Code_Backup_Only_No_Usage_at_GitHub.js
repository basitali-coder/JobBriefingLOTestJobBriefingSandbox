export default {
  async fetch(request) {

    const allowedOrigin = "https://basitali-coder.github.io";


    // Handle browser CORS preflight
    if (request.method === "OPTIONS") {

      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": allowedOrigin,
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      });

    }


    if (request.method !== "POST") {

      return new Response(
        "Only POST allowed",
        {
          status: 405
        }
      );

    }



    try {

      const body =
        await request.json();


      const accessToken =
        body.access_token;


      if (!accessToken) {

        return new Response(
          JSON.stringify({
            error:"missing access_token"
          }),
          {
            status:400,
            headers:{
              "Content-Type":"application/json",
              "Access-Control-Allow-Origin":allowedOrigin
            }
          }
        );

      }



      const salesforceResponse =
        await fetch(

          "https://masternaut--jobbrief.sandbox.my.salesforce.com/services/oauth2/lightningoutsingleaccess",

          {
            method:"POST",

            headers:{

              "Authorization":
                "Bearer " + accessToken,

              "Content-Type":
                "application/json"

            },


            body:
              JSON.stringify({

                appId:
                "1UsR100000000knKAA"

              })

          }

        );



      const result =
        await salesforceResponse.text();



      return new Response(
        result,
        {
          status:salesforceResponse.status,

          headers:{

            "Content-Type":
            "application/json",

            "Access-Control-Allow-Origin":
            allowedOrigin

          }
        }
      );


    }
    catch(error){

      return new Response(

        JSON.stringify({
          error:error.message
        }),

        {
          status:500,

          headers:{
            "Content-Type":"application/json",
            "Access-Control-Allow-Origin":
            allowedOrigin
          }

        }

      );

    }

  }
};
