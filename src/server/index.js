const express = require('express');
const app = express();
const port = 5000;

app.use(express.json()); 

app.use((req,res,next) => {

  const token = req.headers.authorization;
  

  if(!token) {
    return res.status(401).json({
      message : "Authorization token required"
    });
  }

  next();
  
})

const problems = [
  {
    "id": 1,
    "title": "Two Sum"
  },
  {
    "id": 2,
    "title": "Reverse Linked List"
  },
  {
    "id": 3,
    "title": "Valid Parentheses"
  }
]

//Get method
// Define a route for the root URL
app.get('/api/problems', (req, res) => {
  // res.send("Server is working fine"),
  res.status(200).json(problems)
 
});

// triggering particular id based pbs
app.get('/api/problems/:id', (req,res) => {
  const problemId = parseInt(req.params.id);
  const problem = problems.find(p => p.id === problemId);
  
  if(!problem){
    return res.status(404).json({message:"Problem not found"})
  }

  res.status(200).json(problem);
});


// POST METHOD
app.post('/api/problems',(req,res) =>{

  const title = req.body.title;

  if(!title){
    return res.status(400).json({
      message: "Title is required"
    });
  }
  
  //calculate a safe unique new id using math.max
  const newId = problems.length > 0 ? Math.max(...problems.map(problem => problem.id)) + 1 : 1;

  //creating a new problem 
  const newProblem = {
    id: newId, // i.e 4,5,6
    title: title // title snd by user
  }
  problems.push(newProblem);
  
  // snding back the new pb to user to know it worked but it shuld be in json format
  res.status(201).json(newProblem)
});

app.get('/search', (req,res) => {
  const requestQuery = req.query.q;

  // If the user didn't provide a parameter, return an error
  if (!requesQuery) {
    return res.status(400).json({ message: "Please provide a search parameter (?q=...)" });
  }

  //cleaning up the extra spaces and forcing it to lowercase
  const cleanQuery = requestQuery.trim().toLowerCase()

  // step 1 : looking for exact match 
  const exactMatch = problems.find(p => {
    const matchesId = p.id.toString() === cleanQuery;
    const matchesExactTitle = p.title.toLowerCase() === cleanQuery;
    
    return matchesId || matchesExactTitle
  })
  // if the exact match found
  if(exactMatch){
    return res.status(200).json([exactMatch])
  }
  
  // step 2: partial match : // This looks for titles that "contain" the search string (e.g., "Two" matches "Two Sum")
  
  const partialMatches = problems.filter(p => {
    
    return p.title.toLowerCase().includes(cleanQuery);

  })
 
  // if both step fails return 404
  if(partialMatches.length === 0){
    return res.status(404).json({message:"Problem not found"})
  }
  
  // this will return the actual matching pb
  res.status(200).json(partialMatches);
})

//PUT METHOD
app.put('/api/problems/:id',(req,res) => {
  const problemId = parseInt(req.params.id);
  
  //finding the exact pb based on id
  const problem = problems.find(p => p.id === problemId);
  
  // if not found
  if(!problem){
    return res.status(404).json({message: "Problem not found"});
  }

  //if user forgot to send new title return 404 error
  if(!req.body.title){
    return res.status(400).json({
      message :"Title is required for update"
    })

  }

  // updating title directly
  problem.title = req.body.title;

  //returniing the updated one
  res.status(200).json(problem);


})

//DELETE METHOD:

app.delete('/api/problems/:id', (req,res) =>{
  const problemId = parseInt(req.params.id);

  //finding the exact index to delete since it a array
  const problemIndex = problems.findIndex(problem => problem.id === problemId);

  //if that id not found return 404
  if(problemIndex === -1){
    return res.status(404).json({
      message : "Problem not found to delete"
    })
  }
  
  // deleting a pb
  const deleteProblem = problems.splice(problemIndex,1);
 
  // sending the status of deleted ones
  res.status(200).json({
    message: `Problem with id: ${problemId} got deleted`,
    problem: deleteProblem[0]
  })

})

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});