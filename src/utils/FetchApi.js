export default async function FetchApi(){

    try{
        const response = await fetch('https://dev-api.konfhub.com/event/public/konfhub-frontend-evaluation-task');
        const data = await response.json();
        console.log(data)
        return data
    }
    catch(err)
    {
      console.log("Error is Coming")
    }

}