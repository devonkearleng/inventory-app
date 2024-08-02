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
  CircularProgress,
  InputBase,
  Paper,
  AppBar,
  Toolbar,
} from "@mui/material";
import { firestore, auth } from "@/firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import SearchIcon from "@mui/icons-material/Search";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useRouter } from "next/navigation";
import "../page.css";

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

const recipeModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxWidth: 600,
  bgcolor: "white", // Keep the background color white
  color: "black", // Set the text color to black
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Dashboard = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [itemName, setName] = useState("");
  const [itemQuantity, setQuantity] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [recipe, setRecipe] = useState("");
  const [error, setError] = useState("");
  const [recipeModalOpen, setRecipeModalOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user) {
      setUserName(user.name);
      setUserId(user.uid);
      updateInventory(user.uid);
    }
  }, []);

  const updateInventory = async (uid) => {
    setLoading(true);
    const snapshot = query(collection(firestore, `inventory/${uid}/items`));
    const docs = await getDocs(snapshot);
    const inventoryList = [];

    docs.forEach((doc) => {
      inventoryList.push({ id: doc.id, ...doc.data() });
    });
    setInventory(inventoryList);
    setLoading(false);
  };

  const addItem = async () => {
    if (itemName.trim() === "") {
      alert("Item name cannot be empty");
      return;
    }

    const docRef = doc(collection(firestore, `inventory/${userId}/items`));
    const newItem = {
      name: itemName,
      quantity: itemQuantity,
    };

    await setDoc(docRef, newItem);

    setName("");
    setQuantity(1);
    handleClose();
    await updateInventory(userId);
  };

  const deleteItem = async (id) => {
    const docRef = doc(firestore, `inventory/${userId}/items`, id);
    await deleteDoc(docRef);
    await updateInventory(userId);
  };

  const incrementQuantity = async (id, currentQuantity) => {
    const docRef = doc(firestore, `inventory/${userId}/items`, id);
    await setDoc(docRef, { quantity: currentQuantity + 1 }, { merge: true });
    await updateInventory(userId);
  };

  const decrementQuantity = async (id, currentQuantity) => {
    if (currentQuantity <= 1) return;
    const docRef = doc(firestore, `inventory/${userId}/items`, id);
    await setDoc(docRef, { quantity: currentQuantity - 1 }, { merge: true });
    await updateInventory(userId);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setName("");
    setQuantity(1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      sessionStorage.removeItem("user");
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleGenerateRecipe = async () => {
    try {
      setError(""); // Clear any previous errors
      const response = await fetch("/api/generate-recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: inventory }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const data = await response.json();
      setRecipe(data.recipe);
      setRecipeModalOpen(true); // Open the recipe modal
    } catch (error) {
      console.error("Error generating recipe:", error);
      setError("Error generating recipe: " + error.message);
    }
  };

  const handleRecipeModalClose = () => {
    setRecipeModalOpen(false);
    setRecipe("");
  };

  const filteredInventory = inventory.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box display="flex" flexDirection="column" height="100vh" bgcolor="#f5f5f5">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Welcome, {userName}
          </Typography>
          <Button color="inherit" onClick={handleSignOut}>
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>

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
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexGrow={1}
      >
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
              NEW ITEM
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
                      mb={1}
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
                        <IconButton
                          onClick={() => deleteItem(id)}
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </CSSTransition>
                ))
              )}
            </TransitionGroup>
          )}

          <Button
            variant="contained"
            color="primary"
            onClick={handleGenerateRecipe}
            sx={{ mt: 3 }}
          >
            Generate Recipe
          </Button>

          {error && (
            <Box mt={3} p={2} bgcolor="#f0f0f0" borderRadius={2}>
              <Typography variant="body1" color="error">
                {error}
              </Typography>
            </Box>
          )}

          <Modal
            open={recipeModalOpen}
            onClose={handleRecipeModalClose}
            aria-labelledby="recipe-modal-title"
            aria-describedby="recipe-modal-description"
          >
            <Box sx={recipeModalStyle}>
              <Typography id="recipe-modal-title" variant="h6" component="h2">
                Generated Recipe
              </Typography>
              <Box
                id="recipe-modal-description"
                dangerouslySetInnerHTML={{ __html: recipe }}
                sx={{ mt: 2 }}
              />
              <Button onClick={handleRecipeModalClose} sx={{ mt: 2 }}>
                Close
              </Button>
            </Box>
          </Modal>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
