import Dashboard from "../../../components/Dashboard.svelte";
<dashboard>
<script>
    import { getFirestore, doc, getDoc } from "firebase/firestore"; 
    const db=getFirestore();
    let name,age,gender,past_disease,allergies,symptoms,history,summary,severity,predicted_illness,other_illness;
    async function getData()
    {
    const reportInst=doc(db,"reports","5kxliOELs3xOlOloXIpn");
    const reportDet=await getDoc(reportInst);
    const userInst=doc(db,"users","lHIDJSEBAEWIJhIBUj0EPwWheCA3");
    const userDet=await getDoc(userInst);

    name=userDet.data().name;
    age=userDet.data().age;
    gender=userDet.data().gender;
    past_disease=userDet.data().past_disease;
    allergies=userDet.data().allergies;
    
    symptoms=reportDet.data().symptoms;
    history=reportDet.data().history;
    summary=reportDet.data().summary;
    severity=reportDet.data().severity;
    predicted_illness=reportDet.data().predicted_illness;
    other_illness=reportDet.data().other_illness;
    }
    // console.log(docSnap.data())
    


</script>
getData()

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
        <tr><th>Chat Summary: </th> <td>{summary}</td></tr>
        <tr><th>Severity: </th> <td>{severity}</td></tr>
        <tr><th>Predicted Illness: </th> <td>{predicted_illness}</td></tr>
    </table>
</div>
</dashboard>
