const express = require('express'),
    dbOperation = require('./dbFiles/dbOperation'),
    cors = require('cors');


const API_PORT = process.env.PORT || 5000;
const app = express();

let client;
let session;
app.use(express.json());
app.use(express.urlencoded())
app.use(cors());

app.post('/api', async (req, res) =>{
    console.log('call course');
    const result =  await dbOperation.getResource(req.body.name);
    res.send(result.recordset);
});

app.post('/rsg', async (req, res) =>{
    console.log('call resource');
    const result =  await dbOperation.getResource();
    // console.log(result);
    res.send(result);
});


app.post('/del', async (req, res) =>{
    console.log(req.body.id);
    const result = await dbOperation.delResource(req.body.id);
    console.log(result);
    // res.send(result);
});


app.post('/modify', async (req, res) =>{
    console.log(req.body.id);
    if (req.body.col === 'Name'){
        const result = await dbOperation.modifyname(req.body);
    }
    else if (req.body.col === 'link'){
        const result = await dbOperation.modifylink(req.body);
    }
    else if (req.body.col === 'Type'){
        const result = await dbOperation.modifytype(req.body);
    }
    else if (req.body.col === 'Course'){
        const result = await dbOperation.modifycourse(req.body);
    }
    console.log("hogya");
    res.send({result: 1});
});


app.post('/events', async (req, res) =>{
    console.log('call event');
    const result =  await dbOperation.getEvent();
    // console.log(result);
    res.send(result);
});

app.post('/courses', async (req, res) =>{
    console.log('call courses');
    const result =  await dbOperation.getCourses();
    // console.log(result);
    res.send(result);
});

app.post('/instructors', async (req, res) =>{
    console.log('call instructors');
    const result =  await dbOperation.getInstructors();
    // console.log(result);
    res.send(result);
});

app.post('/forms', async (req, res) =>{
    console.log('call forms');
    const result =  await dbOperation.getForms();
    // console.log(result);
    res.send(result);
});

app.post('/hello', async (req, res) => {
    console.log('called');
    await dbOperation.createUser(req.body);
    // const result = await dbOperation.getresource(req.body.name);
    res.send({result: 'hi'});
});


app.post('/loginrequest', async (req, res) => {
    console.log('login_api_calledd');
    const status = await dbOperation.logIn(req.body);
    // if (status) {
        // res.send({result: 'success'}, status.recordset);
    // } else {
    
    if (status.recordset.length>0) 
    {
        // console.log("success");
        res.send({result : status.recordset , status:'success' });
    }

    else {
        res.send({result : 'failed' , status:'failed' });
    }
    
    // }
});



app.post('/addinst', async (req, res) => {
    console.log('call inst');
    const stat = await dbOperation.addinstructor(req.body);
    // const result = await dbOperation.getresource(req.body.name);
    console.log(stat);
    if (stat == 1) {
    res.send({result : 'Instructor Added Successfully'}); }
    else {
        res.send({result : 'Instructor Already Exists'});
    }
});
app.post('/addcourse', async (req, res) => {
    console.log('call course');
    const stat = await dbOperation.addcourse(req.body);
    // const result = await dbOperation.getresource(req.body.name);
    console.log(stat);
    if (stat == 1) {
    res.send({result : 'Instructor Added Successfully'}); }
    else {
        res.send({result : 'Instructor Already Exists'});
    }
});





app.post('/resource', async (req, res) => {
    console.log('call res');
    const stat = await dbOperation.addresource(req.body);
    // const result = await dbOperation.getresource(req.body.name);
    console.log(stat);
    if (stat == 1) {
    res.send({result : 'Instructor Added Successfully'}); }
    else {
        res.send({result : 'Instructor Already Exists'});
    }
});


app.post('/addform', async (req, res) => {
    console.log('call form');
    const stat = await dbOperation.addform(req.body);
    // const result = await dbOperation.getresource(req.body.name);
    console.log(stat);
    if (stat == 1) {
    res.send({result : 'Instructor Added Successfully'}); }
    else {
        res.send({result : 'Instructor Already Exists'});
    }
});


app.post('/addevent', async (req, res) => {
    console.log('called');
    const stat = await dbOperation.addevent(req.body);
    // const result = await dbOperation.getresource(req.body.name);
    console.log(stat);
    if (stat == 1) {
    res.send({result : 'Instructor Added Successfully'}); }
    else {
        res.send({result : 'Instructor Already Exists'});
    }
});


app.post('/addsugg', async (req, res) => {
    console.log('called suggestion');
    const stat = await dbOperation.addSuggestion(req.body);
    // const result = await dbOperation.getresource(req.body.name);
    console.log(stat);
    if (stat == 1) {
    res.send({result : 'Suggestion Added Successfully'}); }
    else {
        res.send({result : 'Error Occured'});
    }
});
app.post('/visitedres', async (req, res) => {
    console.log(req.body);
    const stat = await dbOperation.addHistory(req.body);
    // const result = await dbOperation.getresource(req.body.name);
    console.log(stat);
    if (stat == 1) {
    res.send({result : 'Suggestion Added Successfully'}); }
    else {
        res.send({result : 'Error Occured'});
    }
});


app.post('/dashboard', async (req, res) => {
    console.log("db called");
    const stat = await dbOperation.viewUser(req.body);
    // console.log(stat[0]);
    // res.send({res: stat[0], res2: stat2});
    res.send(stat[0])
});
app.post('/dashboard2', async (req, res) => {
    console.log("db called22");
    const stat2 = await dbOperation.viewHistory(req.body);
    console.log(stat2);
    // res.send({res: stat[0], res2: stat2});
    res.send(stat2)
});


    

// let Student = new Employee(1, 'Ali', 'Alavi', '1234', 'CS', 2019,  'ab01234@st.habib.edu.pk', 03001234567);
    


// dbOperation.getResource().then(res => {
//     console.log(res); })


// dbOperation.creatUser();



app.listen(API_PORT, ()=> console.log(`LISTENING ON PORT ${API_PORT}`));

