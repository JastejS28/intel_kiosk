# Healthcare Kiosk – AI-Based Patient Priority Queue System

## Overview

The Healthcare Kiosk is a comprehensive AI-powered system for patient triage and queue management, designed for clinics, hospitals, and community health centers. It leverages machine learning and real-time data integration to assign priority to patients based on medical urgency, vital sign abnormalities, and waiting time. The platform is robust, modular, and interoperable with India’s digital health ecosystem, supporting Ayushman Bharat Digital Mission (ABDM) and other national health initiatives.

---

## Table of Contents

1. [Features](#features)
2. [System Architecture](#system-architecture)
3. [Technical Implementation](#technical-implementation)
4. [Detailed Module Breakdown](#detailed-module-breakdown)
5. [Workflow Summary](#workflow-summary)
6. [National Healthcare Alignment](#national-healthcare-alignment)
7. [Installation & Usage](#installation--usage)
8. [Video Prototype](#video-prototype)
9. [Team Members](#team-members)
10. [Mentors](#mentors)
11. [License](#license)

---

## Features

- **Quick Registration:**  
  Patients register at a touchscreen kiosk, inputting minimal details for a fast start.

- **Vital Signs Monitoring:**  
  Patients or staff enter vital signs (heart rate, BP, oxygen saturation, temperature, respiratory rate). The system highlights abnormal values for clinical attention.

- **AI-Based Dynamic Priority Scoring:**  
  An XGBoost-based ML model (accessed via an API or locally) evaluates patient vitals to assign a priority score (low, medium, high). Scoring considers both immediate risk and waiting time for fairness.

- **Time-Based Priority Adjustment:**  
  Patients waiting beyond a threshold are bumped up in priority, ensuring justice in service delivery.

- **Real-Time Queue Management:**  
  The live queue is displayed on the kiosk and admin dashboard, updating dynamically with patient status and priorities.

- **Offline Scoring Fallback:**  
  If the ML API is unreachable, a local scoring algorithm ensures uninterrupted triage.

- **Admin Dashboard:**  
  Provides healthcare staff with a detailed view of the queue, patient information, abnormal vitals, and actionable controls for patient calling and queue management.

- **Secure Data Storage:**  
  All data is persisted in MongoDB with best practices for privacy and security.

- **Comprehensive Statistics:**  
  The admin dashboard displays total patients, counts by priority level, average wait times, and other real-time analytics.

- **Role-Based Access:**  
  Only authorized staff can access the admin dashboard and sensitive operations.

- **Modular National Health Integration:**  
  Designed for easy integration with ABHA health IDs, eSanjeevani, NDHM, and other digital public infrastructure.

---

## System Architecture

```
+----------------------+      +------------------+      +---------------------+
|   Patient Frontend   | ---> |   Backend/API    | ---> |   ML Service (API,  |
| (React.js/MaterialUI)|      | (Node.js/Express)|      |   FastAPI + XGBoost)|
|                      | <--- |                  | <--- |                     |
+----------------------+      +------------------+      +---------------------+
         |                                                        ^
         v                                                        |
+----------------------+                                   +----------------------+
|   MongoDB Database   | <---------------------------------+   Admin Dashboard    |
|  (Patient & Queue    |                                   |  (React.js/MaterialUI|
|     Records)         |                                   |   for Health Staff)  |
+----------------------+                                   +----------------------+
```

---

## Technical Implementation

- **Frontend:**  
  - Built with React.js and Material-UI for kiosk and admin interfaces.
  - Session management for robustness across page reloads.
  - Real-time queue and statistics display.

- **Backend:**  
  - Node.js with Express handles API routing, business logic, and database interaction.
  - Integrates with an external ML API (`/queue-assigner.onrender.com/docs`) for scoring, with local fallback logic.
  - Exposes endpoints for patient registration, queue retrieval, and admin operations.

- **Database:**  
  - MongoDB securely stores patient records, vitals, queue logs, and scoring results.

- **Machine Learning Service:**  
  - FastAPI application serves an XGBoost model for vitals-based triage.
  - Receives patient vitals, returns risk and priority.
  - RL-based (Reinforcement Learning) scheduler in Python combines rule-based and learned scheduling for smarter, adaptive triage (see [`Queue_Assigner` repo]).

- **Scalability & Security:**  
  - Designed for horizontal scaling.
  - Secure API communication, RBAC for admin operations, and best practices for sensitive health data.

---

## Detailed Module Breakdown

### Patient Registration & Vital Input

- Patient registration is initiated on the kiosk UI.
- Vitals are entered via an intuitive form; abnormal values are flagged with color codes.
- On submit, data is sent to the backend and stored in MongoDB. The system can survive page reloads (sessionStorage) until the process is complete.

### Queue Management & Priority Assignment

- **Queue Structure:**  
  Each patient in the queue has a unique ID, full name, risk level, confidence score, priority score, queue position, estimated wait time, and timestamp.

- **Priority Calculation:**  
  Backend sends vitals to the ML API, which returns a risk/priority score (with RL-based adjustments for fairness and learning).
  - If the ML API is unavailable, the backend uses a local scoring function.

- **Dynamic Updates:**  
  Queue is refreshed automatically (every 20–30 seconds) and on-demand (manual refresh).
  - Priority is recalculated with each update, factoring in waiting time and patient outcomes (via RL feedback).

### Admin Dashboard

- **Core Features:**  
  - Current queue status with patient names, priorities, abnormal vitals, wait times, and check-in times.
  - Statistics: total patients, breakdown by risk level, average wait time.
  - Action buttons: Call next patient, refresh queue, clear queue, update priorities.
  - Feedback and error handling for admin operations.
- **Role-Based Access:**  
  Only authorized users can view and manage the admin panel.

### Machine Learning & RL Scheduler (`Queue_Assigner`)

- **ML Model:**  
  XGBoost model predicts risk based on vitals.
- **RL Scheduler:**  
  Combines rule-based triage with reinforcement learning for dynamic, adaptive queue management.
  - Adjusts low-risk patient priorities based on learned policies and patient outcomes.
  - Patient queue is sorted using both rule-based and RL-based adjustments.
  - The system periodically updates the RL model based on feedback (e.g., actual outcomes).

### API Endpoints (Sample)

- `POST /patients`: Register/check-in a new patient.
- `GET /patients`: Retrieve the current live queue with priority and wait times.
- `POST /queue/next`: Call the next patient (admin only).
- `POST /queue/update-priorities`: Force update of all patient priorities.
- `DELETE /queue/clear`: Clear the queue for testing/reset.

---

## Workflow Summary

1. **Check-in:**  
   Patient enters details and vitals at the kiosk.

2. **Priority Scoring:**  
   Backend submits vitals to the ML API; priority is calculated and stored.

3. **Queue Update:**  
   Patient is added to the live queue, which is auto-sorted by urgency and wait time.

4. **Live Display:**  
   Patients see their queue status at the kiosk; staff see the full queue and statistics in the admin dashboard.

5. **Staff Actions:**  
   Staff use the admin panel to call next patients, override priorities if needed, and monitor abnormal vitals.

6. **Outcome Feedback:**  
   RL scheduler receives outcome data to improve future triage.

---

## National Healthcare Alignment

- **ABDM & ABHA Integration:**  
  Supports modular integration with Health IDs and national digital health records.

- **Accessibility:**  
  Designed for rural and under-resourced settings; simple UI and offline fallback ensure reliability.

- **Efficiency:**  
  Reduces manual triage, automates queue management, and ensures fairness via AI and RL.

- **Interoperability:**  
  Built for easy connection with eSanjeevani, NDHM, and other digital health tools.

---

## Installation & Usage

> **Detailed setup instructions are in [docs/SETUP.md].**

**Prerequisites:**
- Node.js (v14+)
- npm or yarn
- MongoDB (local or Atlas)
- Python 3.x (for ML/RL service)

**Quick Start:**
```bash
git clone https://github.com/JastejS28/intel_kiosk.git
cd intel_kiosk
npm install
npm run dev
# For ML/RL service
cd ml_service
pip install -r requirements.txt
uvicorn app:app --reload
```
- Kiosk UI: `http://localhost:3000`
- Admin Dashboard: `http://localhost:3000/admin`
- Backend API: `http://localhost:5000`
- ML API: `http://localhost:8000`

---

## Video Prototype

> **[https://www.youtube.com/watch?v=wuJvU3l7IYM]**

- _A video demonstration of patient check-in, queue management, and admin dashboard will be available here._

---

## Team Members

- _Add names, roles, and contact info below:_
  - **Aditya Channa** – ML/Backend Developer [Linkedin](https://www.linkedin.com/in/adityachanna/)
  - **Jastej Singh** – Full Stack Developer [Linkedin](https://www.linkedin.com/in/jastej-singh-27940a290/)
  - **Avneesh** – ML/Data Engineer [Linkedin](https://www.linkedin.com/in/avneesh-avneesh-99a40b284/)

---

## Mentors

- _List mentors and advisors below:_
  - **Dr. Garima Mittal** – Assistant Professor at Maharaja Agrasen Institute of Technology

---

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for full terms.

---

## Acknowledgments

- Ayushman Bharat Digital Mission (ABDM)
- Digital Health Incentive Scheme (DHIS)
- Open-source contributors and libraries
- [Queue_Assigner](https://github.com/adityachanna/Queue_Assigner) for ML/RL-powered queue logic

---

**Empowering equitable, efficient, and data-driven healthcare for all.**
