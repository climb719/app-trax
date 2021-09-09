class ApiService {

    constructor(api) {
        this.api = api
    }

   // getJobs = () => fetch(this.api + "/jobs").then(resp => resp.json())

    getStatuses = () => fetch(this.api + "/statuses").then(resp => resp.json())

    createJobApp = (newApp) => fetch(this.api + "/jobs", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newApp),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
    //   .catch((error) => {
    //     console.error('Error:', error);
    //   });
}