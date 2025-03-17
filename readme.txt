National Bonds Front End Application Documentation
===============================================

This document explains the structure of the data and how the application works.

JSON Data Structure
-----------------

The application uses a JSON data structure (dashboard-data.json) with the following main sections:

1. overallScore (number)
   - Represents the overall performance score (0-100)
   - Used in the ScoreCard component to display the main score
   - Validation: Must be a number between 0 and 100

2. complianceRequirements (object)
   - header:
     * title: Section title ("identified strengths")
     * description: Explains what the section represents
   - items: Array of requirements
     * name: Name of the requirement
     * status: Boolean indicating if requirement was met
   - Validation:
     * Header title and description are required
     * Each item must have a name and status
     * Status must be a boolean value

3. bestPractices (object)
   - header:
     * title: Section title ("missed opportunities")
     * description: Explains what these items represent
   - items: Array of practices
     * name: Name of the practice
     * description: Detailed explanation of what was missed
   - Validation:
     * Header title and description are required
     * Each item must have a name and description
     * Description is required for missed practices

4. keyTriggerMoments (array)
   - Array of important conversation moments
   - Each moment contains:
     * category: Type of trigger (e.g., "Retention")
     * customerTrigger: What the customer said
     * actualResponse: How the agent responded
     * optimalResponse: How they should have responded
   - Validation:
     * All fields (category, customerTrigger, actualResponse, optimalResponse) are required
     * Each trigger moment must include all four components

5. performanceCategories (array)
   - List of performance areas
   - Each category has:
     * name: Category name
     * expanded: Boolean for UI state
   - Validation:
     * Each category must have a name and expanded state
     * expanded must be a boolean value

Data Validation
--------------
The application uses JSON Schema (dashboard-schema.json) for data validation with the following rules:
- All top-level sections (overallScore, complianceRequirements, bestPractices, keyTriggerMoments, performanceCategories) are required
- Nested objects enforce their own required fields as specified above
- The schema follows JSON Schema Draft-07 specification
- Type checking is enforced for all fields (string, number, boolean, array, object)

Component Structure
-----------------

1. Layout.tsx
   - Main layout component
   - Handles sidebar navigation and overall page structure
   - Contains the nada logo, navigation links, and "Speak to nada" button

2. ScoreCard.tsx
   - Displays the overall conversation score
   - Shows the score as a percentage with a circular border
   - Includes a subtitle explaining the scoring system

3. RequirementsList.tsx
   - Used for both compliance requirements and best practices
   - Displays items with checkmarks (✓) for met requirements
   - Shows X marks (✕) for missed practices
   - Includes expandable descriptions for missed items

4. TriggerMoment.tsx
   - Shows key moments from customer interactions
   - Displays:
     * Category label (e.g., "Retention")
     * Customer's trigger statement
     * Actual response given
     * Optimal response that should have been given

5. CategoryList.tsx
   - Shows performance categories with expandable sections
   - Uses icons to represent different categories
   - Allows toggling of expanded state

Data Flow
--------

1. The dashboard-data.json file serves as the data source
2. Data is imported into page.tsx
3. page.tsx distributes data to respective components:
   - Overall score to ScoreCard
   - Requirements and practices to RequirementsList
   - Trigger moments to TriggerMoment
   - Categories to CategoryList

4. Each component handles its specific data visualization:
   - ScoreCard: Numerical display
   - RequirementsList: Checklist format
   - TriggerMoment: Conversation analysis
   - CategoryList: Expandable category list

Styling
-------

- Uses Tailwind CSS for styling
- Color scheme:
  * Primary: #c68f00 (golden)
  * Success: #91cdc5 (teal)
  * Error: #e8878b (pink)
  * Text: gray-500, gray-600, gray-700
- Consistent rounded corners (rounded-lg)
- Responsive layout with fixed sidebar
- Custom font families: Gotham for main text

Note: The application is built with Next.js 14 and uses server actions for backend communication. All components are client-side rendered ("use client") to enable interactive features.
