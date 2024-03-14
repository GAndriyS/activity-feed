import { Box } from '@mui/material';
import AppContext from './AppContext';
import ActivityFeed from './components/ActivityFeed';
import { ThemeProvider } from "@mui/material/styles";
import theme from './theme';
import { useNotes } from './hooks';

function App() {
  const [notes, setNotes] = useNotes();

  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider value={{
        notes,
        setNotes
      }}>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <ActivityFeed />
        </Box>

      </AppContext.Provider>
    </ThemeProvider>
  );
}

export default App;
