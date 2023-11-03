<script>
    import { getFirestore, doc, getDoc } from "firebase/firestore"; 
    const db=getFirestore();
    const reportInst=doc(db,"reports","5kxliOELs3xOlOloXIpn");
    const reportDet=await getDoc(reportInst);
    // console.log(docSnap.data())
    const userInst=doc(db,"users","lHIDJSEBAEWIJhIBUj0EPwWheCA3");
    const userDet=await getDoc(userInst);

    let _id=userDet.data()._id;
    let name=userDet.data().name;
    let age=userDet.data().age;
    let gender=userDet.data().gender;
    let past_disease=userDet.data().past_disease;
    let allergies=userDet.data().allergies;
    
    let symptoms=reportDet.data().symptoms;
    let history=reportDet.data().history;
    let summary=reportDet.data().summary;
    let severity=reportDet.data().severity;
    let predicted_illness=reportDet.data().predicted_illness;
    let other_illness=reportDet.data().other_illness;

</script>

<div class="InsideDashboard">
    <table class="report_details">
        <tr><th>Patient id: </th> <td>{_id}</td></tr>
        <tr><th>Patient Name: </th> <td>{name}</td></tr>
        <tr><th>Patient age: </th> <td>{age}</td></tr>
        <tr><th>Patient gender: </th> <td>{gender}</td></tr>
        <tr><th>Past Illnesses: </th> <td>{past_disease}</td></tr>
        <tr><th>Known allergies: </th> <td>{allergies}</td></tr>
    </table>
    <table>
        <tr><th>Patient History: </th> <td>{_id}</td></tr>
        <tr><th>Visible Symptoms: </th> <td>{symptoms}</td></tr>
        <tr><th>Chat Summary: </th> <td>{summary}</td></tr>
        <tr><th>Severity: </th> <td>{severity}</td></tr>
        <tr><th>Predicted Illness: </th> <td>{predicted_illness}</td></tr>
    </table>
</div>

<style>
    
</style>
