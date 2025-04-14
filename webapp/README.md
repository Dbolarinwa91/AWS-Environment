# getting started 
run the command 
npx create-next-app@latest 

# install spline 
npm i @splinetool/react-spline
npm i typewriter-effect 

├── services/                            # Services parent route
│   ├── page.js                          # Services overview page
│   ├── [service]/                       # Dynamic route for individual services
│   │   ├── page.js                      # Individual service page template
│   │   └── components/                  # Service-specific components
│   │       ├── ServiceDetails.jsx
│   │       ├── ServicePricing.jsx
│   │       └── ServiceCTA.jsx

├── page.js                              # Main homepage with the service cards
├── layout.js                            # Root layout with shared UI
├── globals.css                          # Global styles
│
├── consultation/                        # Consultation request route
│   ├── page.js                          # Consultation form page
│   └── success/                         # Post-submission success page
│       └── page.js
│
├── services/                            # Services parent route
│   ├── page.js                          # Services overview page
│   ├── [service]/                       # Dynamic route for individual services
│   │   ├── page.js                      # Individual service page template
│   │   └── components/                  # Service-specific components
│   │       ├── ServiceDetails.jsx
│   │       ├── ServicePricing.jsx
│   │       └── ServiceCTA.jsx
│   │
│   └── layout.js                        # Shared layout for all service pages
│
├── case-studies/                        # Case studies parent route
│   ├── page.js                          # Case studies overview/listing page
│   ├── [id]/                            # Dynamic route for individual case studies
│   │   └── page.js                      # Individual case study template
│   │
│   └── layout.js                        # Shared layout for case study pages
│
└── api/                                 # API routes for form submissions, etc.
    ├── contact/                         # Contact form handling
    │   └── route.js
    └── consultation/                    # Consultation request handling
        └── route.js