import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

// הגדרת __dirname עבור ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// טעינת משתני הסביבה
dotenv.config({ path: path.join(__dirname, ".env") });

const MONGO_URI = process.env.MONGO_URI;
const PORT = 5000;

if (!MONGO_URI) {
  console.error("❌ Missing MONGO_URI environment variable");
  process.exit(1);
}

const app = express();

// CORS options
const corsOptions = {
  origin: true, // אפשר גישה מכל דומיין בזמן פיתוח
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions));

// Add OPTIONS handling
app.options("*", cors(corsOptions));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Global error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Basic route with error handling
app.get("/", async (req, res) => {
  try {
    const responseData = {
      message: "Server is running!",
      timestamp: new Date().toISOString(),
    };
    console.log("Sending response:", responseData);
    res.json(responseData);
  } catch (error) {
    console.error("Route error:", error);
    res.status(500).json({ error: "Route error" });
  }
});

// סכמה של הציוד
const equipmentSchema = new mongoose.Schema(
  {
    modelNumber: String,
    licenseNumber: String,
    lastMaintenance: Date,
    nextMaintenance: Date,
    status: String,
    location: String,
    heightLimit: String,
    operator: String,
    notes: String,
  },
  {
    collection: "bamot",
    timestamps: true,
    strict: false,
  }
);

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    startDate: Date,
    endDate: Date,
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
    totalAmount: String,
    budget: Number,
  },
  {
    collection: "projects",
    timestamps: true,
  }
);

const InvoiceSchema = new mongoose.Schema({
  invoiceNumber: { type: String, required: true, unique: true },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  amount: { type: Number, required: true },
  issueDate: { type: Date, required: true },
  paymentDate: { type: Date },
  status: { type: String, enum: ["pending", "paid"], default: "pending" },
});

const ClientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: String, required: true },
  recentActivity: { type: Date, default: Date.now },
});

const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchema);
const Equipment =
  mongoose.models.Equipment || mongoose.model("Equipment", equipmentSchema);
const Invoice = mongoose.model("Invoice", InvoiceSchema);
const Client = mongoose.model("Client", ClientSchema);

async function initServer() {
  try {
    // התחברות למונגו
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "equipmentdb",
    });

    console.log("✅ MongoDB Connected");

    // API Routes
    app.get("/api/equipment", async (req, res) => {
      try {
        const equipment = await Equipment.find()
          .sort({ createdAt: -1 })
          .lean()
          .exec();

        console.log(`✅ Found ${equipment.length} items`);
        res.json(equipment);
      } catch (error) {
        console.error("❌ GET Error:", error);
        res.status(500).json({
          error: "שגיאה בטעינת הנתונים",
          details: error.message,
        });
      }
    });

    app.post("/api/equipment", async (req, res) => {
      try {
        const equipment = new Equipment(req.body);
        const result = await equipment.save();

        console.log("✅ Saved successfully:", result);
        res.status(201).json(result);
      } catch (error) {
        console.error("❌ POST Error:", error);
        res.status(500).json({
          error: "שגיאה בשמירת הציוד",
          details: error.message,
        });
      }
    });

    app.get("/api/projects/selected", cors(corsOptions), async (req, res) => {
      try {
        const projects = await Project.find()
          .select("_id name")
          .sort({ createdAt: -1 })
          .lean()
          .exec();

        res.json(projects);
      } catch (error) {
        console.error("❌ GET Error:", error);
        res
          .status(500)
          .json({ error: "Error fetching projects", details: error.message });
      }
    });

    app.get("/api/projects", cors(corsOptions), async (req, res) => {
      try {
        const projects = await Project.find()
          .sort({ createdAt: -1 })
          .lean()
          .exec();
        res.json(projects);
      } catch (error) {
        console.error("❌ GET Error:", error);
        res
          .status(500)
          .json({ error: "Error fetching projects", details: error.message });
      }
    });

    app.post("/api/projects", cors(corsOptions), async (req, res) => {
      try {
        const newProject = req.body;
        const project = new Project(newProject);
        const result = await project.save();
        res.status(201).json(result);
      } catch (error) {
        console.error("Error creating project:", error);
        res.status(500).json({ error: "Failed to create project" });
      }
    });

    app.put("/api/projects/:id", cors(corsOptions), async (req, res) => {
      try {
        const project = await Project.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );
        if (!project)
          return res.status(404).json({ error: "Project not found" });
        res.json(project);
      } catch (error) {
        console.error("❌ PUT Error:", error);
        res
          .status(500)
          .json({ error: "Error updating project", details: error.message });
      }
    });

    app.delete("/api/projects/:id", cors(corsOptions), async (req, res) => {
      try {
        const result = await Project.findByIdAndDelete(req.params.id);
        if (!result)
          return res.status(404).json({ error: "Project not found" });
        res.json({ message: "Project deleted successfully" });
      } catch (error) {
        console.error("❌ DELETE Error:", error);
        res
          .status(500)
          .json({ error: "Error deleting project", details: error.message });
      }
    });

    app.get("/api/finance/summary", cors(corsOptions), async (req, res) => {
      try {
        const today = new Date();
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const startOfLastMonth = new Date(
          today.getFullYear(),
          today.getMonth() - 1,
          1
        );

        // Aggregate revenue, pending payments, and late payments
        const financeData = await Invoice.aggregate([
          {
            $group: {
              _id: null,
              totalRevenue: {
                $sum: { $cond: [{ $eq: ["$status", "paid"] }, "$amount", 0] },
              },
              pendingPayments: {
                $sum: {
                  $cond: [{ $eq: ["$status", "pending"] }, "$amount", 0],
                },
              },
              latePayments: {
                $sum: {
                  $cond: [
                    {
                      $and: [
                        { $eq: ["$status", "pending"] },
                        { $lt: ["$paymentDate", today] },
                      ],
                    },
                    "$amount",
                    0,
                  ],
                },
              },
            },
          },
        ]);

        // Calculate monthly revenue growth
        const lastMonthRevenue = await Invoice.aggregate([
          {
            $match: {
              issueDate: { $gte: startOfLastMonth, $lt: startOfMonth },
              status: "paid",
            },
          },
          {
            $group: {
              _id: null,
              revenue: { $sum: "$amount" },
            },
          },
        ]);

        const currentMonthRevenue = await Invoice.aggregate([
          {
            $match: {
              issueDate: { $gte: startOfMonth, $lte: today },
              status: "paid",
            },
          },
          {
            $group: {
              _id: null,
              revenue: { $sum: "$amount" },
            },
          },
        ]);

        const lastMonthRev = lastMonthRevenue.length
          ? lastMonthRevenue[0].revenue
          : 0;
        const currentMonthRev = currentMonthRevenue.length
          ? currentMonthRevenue[0].revenue
          : 0;

        const monthlyGrowth =
          lastMonthRev === 0
            ? currentMonthRev > 0
              ? 100
              : 0
            : ((currentMonthRev - lastMonthRev) / lastMonthRev) * 100;

        res.json({
          totalRevenue: financeData[0]?.totalRevenue || 0,
          pendingPayments: financeData[0]?.pendingPayments || 0,
          latePayments: financeData[0]?.latePayments || 0,
          monthlyGrowth: monthlyGrowth.toFixed(2),
        });
      } catch (error) {
        res.status(500).json({
          error: "Failed to fetch financial summary",
          details: error.message,
        });
      }
    });

    app.post("/api/invoices", cors(corsOptions), async (req, res) => {
      try {
        const { clientName, email, phone, ...invoiceData } = req.body;
        let client = await Client.findOne({ email });

        if (!client) {
          client = new Client({ name: clientName, email, phone });
        } else {
          client.recentActivity = new Date();
        }
        await client.save();
        const invoice = new Invoice({ ...invoiceData, client: client._id });
        await invoice.save();

        res.status(201).json(invoice);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    });

    // Get all invoices
    app.get("/api/invoices", cors(corsOptions), async (req, res) => {
      try {
        const invoices = await Invoice.find()
          .populate("client")
          .populate("project");

        const formattedInvoices = invoices.map((invoice) => ({
          invoiceNumber: invoice.invoiceNumber,
          amount: invoice.amount,
          issueDate: invoice.issueDate,
          paymentDate: invoice.paymentDate,
          status: invoice.status,
          clientName: invoice.client.name,
          email: invoice.client.email,
          phone: invoice.client.phone,
          _id: invoice._id,
          project: invoice.project._id,
        }));

        res.json(formattedInvoices);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch invoices" });
      }
    });

    // Update an invoice
    app.put("/api/invoices/:id", cors(corsOptions), async (req, res) => {
      try {
        const invoice = await Invoice.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );
        res.json(invoice);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    });

    // Delete an invoice
    app.delete("/api/invoices/:id", cors(corsOptions), async (req, res) => {
      await Invoice.findByIdAndDelete(req.params.id);
      res.json({ message: "Invoice deleted" });
    });

    // Create a new client
    app.post("/api/clients", cors(corsOptions), async (req, res) => {
      try {
        const client = new Client(req.body);
        await client.save();
        res.status(201).json(client);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    });

    // Get all clients
    app.get("/api/clients", cors(corsOptions), async (req, res) => {
      try {
        const clients = await Client.aggregate([
          {
            $lookup: {
              from: "invoices",
              localField: "_id",
              foreignField: "client",
              as: "invoices",
            },
          },
          {
            $lookup: {
              from: "projects",
              localField: "invoices.project", // Extract projects from invoices
              foreignField: "_id",
              as: "projects",
            },
          },
          {
            $project: {
              _id: 1,
              name: 1,
              email: 1,
              phone: 1,
              recentActivity: 1,
              invoices: 1,
              projects: 1, // Separate list of projects
            },
          },
          {
            $sort: { _id: -1 },
          },
          {
            $limit: 10,
          },
        ]);

        res.json(clients);
      } catch (error) {
        res.status(500).json({
          error: "Failed to fetch clients and related data",
          details: error.message,
        });
      }
    });

    // Update client details
    app.put("/api/clients/:id", cors(corsOptions), async (req, res) => {
      try {
        const client = await Client.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
        });
        res.json(client);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    });

    // Delete a client
    app.delete("/api/clients/:id", cors(corsOptions), async (req, res) => {
      await Client.findByIdAndDelete(req.params.id);
      res.json({ message: "Client deleted" });
    });

    app.get(
      "/api/finance/aging-report",
      cors(corsOptions),
      async (req, res) => {
        try {
          const today = new Date();
          const days30 = new Date();
          days30.setDate(today.getDate() - 30);

          const days60 = new Date();
          days60.setDate(today.getDate() - 60);

          // Get total revenue (sum of all paid invoices)
          const revenueData = await Invoice.aggregate([
            { $match: { status: "paid" } },
            {
              $group: {
                _id: null,
                totalRevenue: { $sum: "$amount" },
              },
            },
          ]);

          // Get pending payments breakdown by age
          const agingReport = await Invoice.aggregate([
            { $match: { status: "pending" } },
            {
              $project: {
                amount: 1,
                ageCategory: {
                  $switch: {
                    branches: [
                      {
                        case: { $gte: ["$issueDate", days30] },
                        then: "0-30 Days",
                      },
                      {
                        case: { $gte: ["$issueDate", days60] },
                        then: "31-60 Days",
                      },
                    ],
                    default: "60+ Days",
                  },
                },
              },
            },
            {
              $group: {
                _id: "$ageCategory",
                amount: { $sum: "$amount" },
              },
            },
          ]);

          // Formatting Aging Report
          const agingSummary = {
            "0-30 Days": 0,
            "31-60 Days": 0,
            "60+ Days": 0,
          };
          agingReport.forEach((item) => {
            agingSummary[item._id] = item.amount;
          });

          res.json({
            totalRevenue: revenueData[0]?.totalRevenue || 0,
            totalExpenses: 0, // You need an Expense schema to calculate this
            agingReport: agingSummary,
          });
        } catch (error) {
          res.status(500).json({
            error: "Failed to fetch aging report",
            details: error.message,
          });
        }
      }
    );

    // Health check
    app.get("/health", (req, res) => {
      res.json({
        status: "OK",
        mongo:
          mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
      });
    });

    // הפעלת השרת
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`🔗 Health check at http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error("❌ Server initialization failed:", error);
    process.exit(1);
  }
}

// טיפול בשגיאות לא מטופלות
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Promise Rejection:", err);
});

// ניקוי בעת סגירת האפליקציה
process.on("SIGINT", async () => {
  try {
    await mongoose.connection.close();
    console.log("✅ MongoDB connection closed through app termination");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error during cleanup:", error);
    process.exit(1);
  }
});

// הפעלת השרת
initServer();

export default app;
