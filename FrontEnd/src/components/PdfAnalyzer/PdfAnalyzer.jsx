import { useState } from 'react';
import { uploadToCloudinary } from '../../utils/cloudinary';
// import { analyzePDFWithGemini } from '../../utils/gemini';
import './PdfAnalyzer.css';

const PdfAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError('');
    } else {
      setError('Please select a valid PDF file');
      setFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a PDF file first');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Upload to Cloudinary
      const cloudinaryResponse = await uploadToCloudinary(file);
      console.log('PDF uploaded to Cloudinary:', cloudinaryResponse.url);

      // Analyze with Gemini
      const analysisResult = await analyzePDFWithGemini(file);
      setAnalysis(analysisResult);
    } catch (err) {
      setError(err.message || 'An error occurred while processing the PDF');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pdf-analyzer-container">
      <h2>PDF Health Analysis</h2>
      
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="file-input-container">
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="file-input"
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button 
          type="submit" 
          disabled={!file || loading}
          className="analyze-button"
        >
          {loading ? 'Analyzing...' : 'Analyze PDF'}
        </button>
      </form>

      {loading && (
        <div className="loading-message">
          Processing your PDF... Please wait...
        </div>
      )}

      {analysis && (
        <div className="analysis-results">
          <h3>Analysis Results</h3>
          <div className="analysis-content">
            {analysis}
          </div>
        </div>
      )}
    </div>
  );
};

export default PdfAnalyzer;
