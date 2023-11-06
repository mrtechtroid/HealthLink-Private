<script>
    import Dashboard from "../../../components/Dashboard.svelte";
    import { getFirestore, doc, getDoc } from "firebase/firestore";
    import { page } from "$app/stores";
    import { SAMLAuthProvider } from "firebase/auth";
    const db = getFirestore();
    let name,
        age,
        gender,
        past_disease,
        allergies,
        symptoms,
        history,
        summary,
        severity,
        predicted_illness,
        other_illness;
    let reportID = $page.params.reportID;
    async function getData() {
        const reportInst = doc(db, "reports", reportID);
        const reportDet = await getDoc(reportInst);
        name = reportDet.data().patient_info.name;
        age = reportDet.data().patient_info.age;
        gender = reportDet.data().patient_info.gender;
        past_disease = reportDet.data().patient_info.past_disease;
        allergies = reportDet.data().patient_info.allergies;
        symptoms = reportDet.data().symptoms;
        history = reportDet.data().history;
        summary = reportDet.data().summary;
        severity = reportDet.data().severity;
        predicted_illness = reportDet.data().predicted_illness;
        other_illness = reportDet.data().other_illness;
    }
    getData();
</script>

<Dashboard>
    <div class="InsideDashboard">
        <h1>Medical Report:-</h1>
        
        <h2>Patient details:-</h2>
        <table class="Report_details">
            <tr><th>Patient Name: </th> <td>{name}</td><td><img src="edit.png"/></td></tr>
            <tr><th>Patient age: </th> <td>{age}</td><td><img src="edit.png"/></td></tr>
            <tr><th>Patient gender: </th> <td>{gender}</td><td><img src="edit.png"/></td></tr>
            <tr><th>Past Illnesses: </th> <td>{past_disease}</td><td><img src="edit.png"/></td></tr>
            <tr><th>Known allergies: </th> <td>{allergies}</td><td><img src="edit.png"/></td></tr>
        </table>
        <h2>Conversation details:-</h2>
        <table>
            <tr><th>Visible Symptoms: </th> <td>{symptoms}</td></tr>
            <tr><th>Summary: </th> <td>{summary}</td></tr>
            <tr><th>Severity: </th> <td>{severity}</td></tr>
            <tr><th>Predicted Illness: </th> <td>{predicted_illness}</td></tr>
        </table>
        
    </div>

</Dashboard>

    <style>
        table, th, td
        {
            border-bottom: 0.5px solid transparent;
            width: 90%;
            border-color: grey;
            /* padding: 15px; */
            
        }
        table th,td
        {
            padding: 15px;
            text-align: left;
        }
        table th
        {
            width:30%;
        }
        table
        {
            margin: auto;
            /* margin-top: 10%;
            margin-bottom: 10%; */
            border-radius: 5px;
            box-shadow: 5px 5px 5px rgb(244, 222, 255)
        }
        table tr:hover
        {
            transition: 0.2s;
        }
        /* .imgimg
        {width:10%} */
        table tr:hover
        {
           transform: scale(1.02);
           background-color: white;
        }

        .InsideDashboard h2,h1
        {
            padding-top: 4%;
            padding-left: 4%;
            padding-right: 4%;
            padding-bottom: 4%;
            
        }
        .InsideDashboard h1
        {
            text-align: center;
            width: 90%;
        }
        /* .InsideDashboard
        {
            background-color:rgba(120, 230, 206,0.1);
        } */
        
        /* @media screen and (max-width:500px)
        {
            dashboard{width: 0%;}
        } */
    </style>

