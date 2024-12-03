# PDF Reader API with Express.js

This project provides a simple API for extracting text content from a PDF file using Express.js and the `pdf2json` library. It accepts a URL pointing to a PDF file and returns the extracted content along with metadata in a structured JSON format.

## Features
- Extract text content from PDF files.
- Provide metadata about the PDF, including URL, total pages, file name, and creation date.
- Simple and lightweight API.

## Requirements
- Node.js (v14 or later)
- npm (v6 or later)

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/pdf-reader-api.git
   cd pdf-reader-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Usage
1. Start the server:
   ```bash
   node app.js
   ```

2. Access the API at:
   ```
   http://localhost:3000/read?link=<PDF_URL>
   ```

   Replace `<PDF_URL>` with the URL of the PDF file you want to extract text from.

## Example
### Request:
```
GET http://localhost:3000/read?link=https://dagrs.berkeley.edu/sites/default/files/2020-01/sample.pdf
```

### Response:
```json
{
    "metadata": {
        "url": "https://dagrs.berkeley.edu/sites/default/files/2020-01/sample.pdf",
        "totalPages": 3,
        "fileName": "sample.pdf",
        "dateCreated": "19990220212000"
    },
    "pages": [
        {
            "pageNumber": 1,
            "content": "Sample PDF Document Robert Maron Grzegorz Grudziński February 20, 1999"
        },
        {
            "pageNumber": 2,
            "content": "2"
        },
        {
            "pageNumber": 3,
            "content": "Contents 1 Template 5"
        }
    ]
}
```

## API Endpoints
### `/read`
- **Method**: `GET`
- **Query Parameters**:
  - `link` (string): URL of the PDF file to parse.
- **Response**:
  - **`metadata`**:
    - `url` (string): The URL of the PDF file.
    - `totalPages` (number): Total number of pages in the PDF.
    - `fileName` (string): The name of the file (derived from the URL).
    - `dateCreated` (string): Creation date of the PDF file, if available.
  - **`pages`**: Array of objects with the following structure:
    - `pageNumber` (number): The page number.
    - `content` (string): Extracted text content of the page.

## Dependencies
- [Express.js](https://www.npmjs.com/package/express): Web framework for Node.js.
- [pdf2json](https://www.npmjs.com/package/pdf2json): Library for parsing PDF files to JSON.
- [axios](https://www.npmjs.com/package/axios): Promise-based HTTP client for fetching PDF files.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

## Acknowledgements
Special thanks to the developers of `pdf2json` and the Node.js community for providing excellent tools and libraries.