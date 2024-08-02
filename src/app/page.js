// "use client";

// import { useState, useEffect } from "react";
// import {
//   Box,
//   Stack,
//   Typography,
//   Button,
//   Modal,
//   TextField,
//   IconButton,
//   AppBar,
//   Toolbar,
//   CircularProgress,
// } from "@mui/material";
// import { firestore } from "@/firebase";
// import {
//   collection,
//   doc,
//   getDocs,
//   query,
//   setDoc,
//   deleteDoc,
//   getDoc,
// } from "firebase/firestore";
// import DeleteIcon from "@mui/icons-material/Delete";
// import AddIcon from "@mui/icons-material/Add";
// import RemoveIcon from "@mui/icons-material/Remove";
// import { CSSTransition, TransitionGroup } from "react-transition-group";
// import "./page.css"; // Make sure to import the CSS file for animations

// const modalStyle = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "white",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
//   display: "flex",
//   flexDirection: "column",
//   gap: 3,
// };

// const Home = () => {
//   const [inventory, setInventory] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [open, setOpen] = useState(false);
//   const [itemName, setName] = useState("");
//   const [itemQuantity, setQuantity] = useState(1);

//   // Update inventory
//   const updateInventory = async () => {
//     setLoading(true);
//     const snapshot = query(collection(firestore, "inventory"));
//     const docs = await getDocs(snapshot);
//     const inventoryList = [];

//     docs.forEach((doc) => {
//       inventoryList.push({ id: doc.id, ...doc.data() });
//     });
//     setInventory(inventoryList);
//     setLoading(false);
//   };

//   // Add item
//   const addItem = async () => {
//     if (itemName.trim() === "") {
//       alert("Item name cannot be empty");
//       return;
//     }

//     const docRef = doc(collection(firestore, "inventory"));
//     const newItem = {
//       name: itemName,
//       quantity: itemQuantity,
//     };

//     await setDoc(docRef, newItem);

//     setName("");
//     setQuantity(1);
//     handleClose();
//     await updateInventory();
//   };

//   // Delete item
//   const deleteItem = async (id) => {
//     const docRef = doc(firestore, "inventory", id);
//     await deleteDoc(docRef);
//     await updateInventory();
//   };

//   // Increment quantity
//   const incrementQuantity = async (id, currentQuantity) => {
//     const docRef = doc(firestore, "inventory", id);
//     await setDoc(docRef, { quantity: currentQuantity + 1 }, { merge: true });
//     await updateInventory();
//   };

//   // Decrement quantity
//   const decrementQuantity = async (id, currentQuantity) => {
//     if (currentQuantity <= 1) return;
//     const docRef = doc(firestore, "inventory", id);
//     await setDoc(docRef, { quantity: currentQuantity - 1 }, { merge: true });
//     await updateInventory();
//   };

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => {
//     setOpen(false);
//     setName("");
//     setQuantity(1);
//   };

//   useEffect(() => {
//     updateInventory();
//   }, []);

//   return (
//     <Box
//       width="100vw"
//       height="100vh"
//       display="flex"
//       justifyContent="center"
//       flexDirection="column"
//       alignItems="center"
//       gap={2}
//       bgcolor="#f5f5f5"
//     >
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={modalStyle}>
//           <Typography id="modal-modal-title" variant="h6" component="h2">
//             Add Item
//           </Typography>
//           <Stack width="100%" direction="row" spacing={2}>
//             <TextField
//               id="outlined-basic"
//               label="Item"
//               variant="outlined"
//               fullWidth
//               value={itemName}
//               onChange={(e) => setName(e.target.value)}
//             />
//             <TextField
//               id="outlined-basic"
//               label="Quantity"
//               variant="outlined"
//               type="number"
//               fullWidth
//               value={itemQuantity}
//               onChange={(e) => setQuantity(Number(e.target.value))}
//             />
//             <Button
//               variant="contained"
//               onClick={addItem}
//               startIcon={<AddIcon />}
//             >
//               Add
//             </Button>
//           </Stack>
//         </Box>
//       </Modal>

//       <Box
//         mt={3}
//         p={3}
//         bgcolor="white"
//         borderRadius={2}
//         boxShadow={3}
//         width="80%"
//         maxWidth="600px"
//       >
//         <Box
//           display="flex"
//           justifyContent="space-between"
//           alignItems="center"
//           mb={2}
//         >
//           <Typography variant="h4" color="#7c4dff">
//             Inventory Items
//           </Typography>
//           <Button
//             variant="contained"
//             onClick={handleOpen}
//             startIcon={<AddIcon />}
//           >
//             New Task
//           </Button>
//         </Box>

//         {loading ? (
//           <Box
//             display="flex"
//             justifyContent="center"
//             alignItems="center"
//             height="200px"
//           >
//             <CircularProgress />
//           </Box>
//         ) : (
//           <TransitionGroup>
//             {inventory.length === 0 ? (
//               <Typography variant="h6" color="#7c4dff" textAlign="center">
//                 No items in inventory. Add an item to get started.
//               </Typography>
//             ) : (
//               inventory.map(({ id, name, quantity }) => (
//                 <CSSTransition key={id} timeout={500} classNames="item">
//                   <Box
//                     display="flex"
//                     justifyContent="space-between"
//                     alignItems="center"
//                     bgcolor="#f0f0f0"
//                     paddingX={3}
//                     paddingY={2}
//                     borderRadius={2}
//                     mb={1} // Add margin between items
//                   >
//                     <Typography variant="h6" color="#333" style={{ flex: 1 }}>
//                       {name
//                         ? name.charAt(0).toUpperCase() + name.slice(1)
//                         : "No Name"}
//                     </Typography>
//                     <Box
//                       display="flex"
//                       alignItems="center"
//                       style={{ width: 150 }}
//                     >
//                       <IconButton
//                         onClick={() => decrementQuantity(id, quantity)}
//                         color="primary"
//                       >
//                         <RemoveIcon />
//                       </IconButton>
//                       <Typography
//                         variant="h6"
//                         color="#333"
//                         style={{ minWidth: 40, textAlign: "center" }}
//                       >
//                         {quantity}
//                       </Typography>
//                       <IconButton
//                         onClick={() => incrementQuantity(id, quantity)}
//                         color="primary"
//                       >
//                         <AddIcon />
//                       </IconButton>
//                       <IconButton onClick={() => deleteItem(id)} color="error">
//                         <DeleteIcon />
//                       </IconButton>
//                     </Box>
//                   </Box>
//                 </CSSTransition>
//               ))
//             )}
//           </TransitionGroup>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default Home;

"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  Modal,
  TextField,
  IconButton,
  AppBar,
  Toolbar,
  CircularProgress,
  InputBase,
  Paper,
} from "@mui/material";
import { firestore } from "@/firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import SearchIcon from "@mui/icons-material/Search";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./page.css"; // Make sure to import the CSS file for animations

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 3,
};

const Home = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [itemName, setName] = useState("");
  const [itemQuantity, setQuantity] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // Update inventory
  const updateInventory = async () => {
    setLoading(true);
    const snapshot = query(collection(firestore, "inventory"));
    const docs = await getDocs(snapshot);
    const inventoryList = [];

    docs.forEach((doc) => {
      inventoryList.push({ id: doc.id, ...doc.data() });
    });
    setInventory(inventoryList);
    setLoading(false);
  };

  // Add item
  const addItem = async () => {
    if (itemName.trim() === "") {
      alert("Item name cannot be empty");
      return;
    }

    const docRef = doc(collection(firestore, "inventory"));
    const newItem = {
      name: itemName,
      quantity: itemQuantity,
    };

    await setDoc(docRef, newItem);

    setName("");
    setQuantity(1);
    handleClose();
    await updateInventory();
  };

  // Delete item
  const deleteItem = async (id) => {
    const docRef = doc(firestore, "inventory", id);
    await deleteDoc(docRef);
    await updateInventory();
  };

  // Increment quantity
  const incrementQuantity = async (id, currentQuantity) => {
    const docRef = doc(firestore, "inventory", id);
    await setDoc(docRef, { quantity: currentQuantity + 1 }, { merge: true });
    await updateInventory();
  };

  // Decrement quantity
  const decrementQuantity = async (id, currentQuantity) => {
    if (currentQuantity <= 1) return;
    const docRef = doc(firestore, "inventory", id);
    await setDoc(docRef, { quantity: currentQuantity - 1 }, { merge: true });
    await updateInventory();
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setName("");
    setQuantity(1);
  };

  useEffect(() => {
    updateInventory();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredInventory = inventory.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      gap={2}
      bgcolor="#f5f5f5"
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Item
          </Typography>
          <Stack width="100%" direction="row" spacing={2}>
            <TextField
              id="outlined-basic"
              label="Item"
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Quantity"
              variant="outlined"
              type="number"
              fullWidth
              value={itemQuantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
            <Button
              variant="contained"
              onClick={addItem}
              startIcon={<AddIcon />}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>

      <Box
        mt={3}
        p={3}
        bgcolor="white"
        borderRadius={2}
        boxShadow={3}
        width="80%"
        maxWidth="600px"
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h4" color="#7c4dff">
            Inventory Items
          </Typography>
          <Button
            variant="contained"
            onClick={handleOpen}
            startIcon={<AddIcon />}
          >
            New Item
          </Button>
        </Box>
        <Paper
          component="form"
          sx={{ p: "2px 4px", display: "flex", alignItems: "center", mb: 2 }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Inventory"
            inputProps={{ "aria-label": "search inventory" }}
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>

        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="200px"
          >
            <CircularProgress />
          </Box>
        ) : (
          <TransitionGroup>
            {filteredInventory.length === 0 ? (
              <Typography variant="h6" color="#7c4dff" textAlign="center">
                No items found. Add an item to get started.
              </Typography>
            ) : (
              filteredInventory.map(({ id, name, quantity }) => (
                <CSSTransition key={id} timeout={500} classNames="item">
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    bgcolor="#f0f0f0"
                    paddingX={3}
                    paddingY={2}
                    borderRadius={2}
                    mb={1} // Add margin between items
                  >
                    <Typography variant="h6" color="#333" style={{ flex: 1 }}>
                      {name
                        ? name.charAt(0).toUpperCase() + name.slice(1)
                        : "No Name"}
                    </Typography>
                    <Box
                      display="flex"
                      alignItems="center"
                      style={{ width: 150 }}
                    >
                      <IconButton
                        onClick={() => decrementQuantity(id, quantity)}
                        color="primary"
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography
                        variant="h6"
                        color="#333"
                        style={{ minWidth: 40, textAlign: "center" }}
                      >
                        {quantity}
                      </Typography>
                      <IconButton
                        onClick={() => incrementQuantity(id, quantity)}
                        color="primary"
                      >
                        <AddIcon />
                      </IconButton>
                      <IconButton onClick={() => deleteItem(id)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </CSSTransition>
              ))
            )}
          </TransitionGroup>
        )}
      </Box>
    </Box>
  );
};

export default Home;
