import { app } from "./app.js";
import { PORT } from "./src/config/config.js";

app.listen(PORT, () => {
  console.log(`SERVER RUNNING AT http://localhost:${PORT}  `);
});
