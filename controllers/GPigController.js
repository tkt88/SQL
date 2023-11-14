// Get function

exports.getGPigs = async (req, res) =>{

    const { id } = req.params;

    // Setting up to order by id in ascending order 

    const { searchField = "gpig_id", searchDirection = "ASC" } = req.query;

    // Getter- retrieving all the guinea pigs 

    const QUERY = "SELECT * FROM gpigs";

    let SORT = "";

    let CASE = "";

    if (id) {

        // Code that runs if the user has submitted an ID
        // Return results where ID === id submitted in request 

        CASE = ` WHERE gpig_id = ${id}`;
        } else {
        // If multiple results, set up to sort 
        SORT = ` ORDER BY ${searchField} ${searchDirection}`; 
        }
        // Final query to submit to postgresql: SELECT * FROM gpigs +/- WHERE id +/- SORT
        const fullQuery = `${QUERY}${CASE}${SORT}`;
        console.log("fullQuery", fullQuery);

        // Sending the full query as a get request to the database 

        db.query(fullQuery, (error, results) => {
        // console.log("in");
        if (error) {
          // throw error;
            console.log("error", error);
            return res.status(500).send(error);
        }
        if (id && !results?.rows?.length) {
            return res.sendStatus(404);
        }
        // console.log("results", results);
            res.status(200).json(results.rows);
        });
    }
    

// POST function

    exports.addGPig = async (req, res)=>{

        // Just a log to see the data being added
        console.log("Adding", req.body);

        // Setting the fields as the keys of the request body

        const fields = Object.keys(req.body);

        // Creating the column names

        const columns = fields.join(", ");
        const values = [];

        // Pushing the appropriate data into the values array, if it exists 

        for (const field of fields) {
        const value = req.body[field];
        if (value) {
        values.push(value);
        }}

        // Generating the full query SQL to send 

        const fullQuery = `INSERT INTO gpigs (${columns}) VALUES (${values
            .map((v, i) => `$${i + 1}`)
            .join(", ")}) RETURNING *`;

            // Logs to see the full query

            console.log("fullQuery", fullQuery);
            console.log("values", values);

            // Running the full query
        
            db.query(fullQuery, values, (error, results) => {
            console.log("in");
            if (error) {
                console.log("err", error);
                return res.status(500).send(error);
            }
            console.log("done", results);
            if (!results?.rows?.length) {
                return res.sendStatus(404);
            }
            res.status(200).send(results);
            });
        }

// UPDATE FUNCTION 

    exports.updateGPig = async (req, res) =>{

    // Log of data to be updated 

    console.log("Updating", req.params.id);
    const { gpig_id: gpig_id } = req.params;

    // Setting data as the request body
    const data = req.body;

    const keys = Object.keys(data);
    console.log("keys", keys);

    // Building the SQL string

    let setStr = "";

    for (const key in data) {
        if (data.hasOwnProperty(key)) {
        setStr += `${key} = ${
            typeof data[key] === "string" ? `'${data[key]}'` : data[key]
        }, `; // <-- like this
        }
    }
    console.log(setStr);
    const query = `UPDATE gpigs SET ${setStr.slice(
        0,
      setStr.length - 2 // get rid of last ', '
    )} WHERE gpig_id = ${gpig_id} RETURNING *`;
    console.log("full query", query);

    db.query(query, (error, results) => {
        if (error) {
        throw error;
        }
        console.log("results", results);
        if (!results?.rows?.length) {
        return res.sendStatus(404);
        }
        res.status(200).send(results.rows[0]);
    });

    }

    // Delete function

    exports.removeGPig = async(req, res) =>{

    console.log("Deleting", req.params.id);
    const { gpig_id: gpig_id } = req.params;

    console.log("gpigToBeDeleted", gpig_id);
    db.query(
      "DELETE FROM gpigs WHERE id = $1 RETURNING *",
        [gpig_id],
        (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        console.log("results", results);
        if (!results?.rows?.length) {
            return res.sendStatus(404);
        }
        res.status(200).send(results.rows[0]);
        // res.sendStatus(204)
        } 
    );
    }

