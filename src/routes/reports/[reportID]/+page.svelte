<script>
    import Dashboard from "../../../components/Dashboard.svelte";
    import { getFirestore, doc, getDoc } from "firebase/firestore";
    import { page } from "$app/stores";
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
        <table class="report_details">
            <tr><th>Patient Name: </th> <td>{name}</td></tr>
            <tr><th>Patient age: </th> <td>{age}</td></tr>
            <tr><th>Patient gender: </th> <td>{gender}</td></tr>
            <tr><th>Past Illnesses: </th> <td>{past_disease}</td></tr>
            <tr><th>Known allergies: </th> <td>{allergies}</td></tr>
        </table>
        <table>
            <tr><th>Visible Symptoms: </th> <td>{symptoms}</td></tr>
            <tr><th>Summary: </th> <td>{summary}</td></tr>
            <tr><th>Severity: </th> <td>{severity}</td></tr>
            <tr><th>Predicted Illness: </th> <td>{predicted_illness}</td></tr>
        </table>
    </div>
</Dashboard>
