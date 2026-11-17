
import { useEffect, useState } from "react";
import resumeService from "./resume.service";

import type {
  Resume,
  ATSAnalysis,
} from "./resume.types";

function ResumeAnalyzer() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [analyses, setAnalyses] = useState<ATSAnalysis[]>([]);

  const [selectedResumeId, setSelectedResumeId] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [loading, setLoading] = useState(true);

  const [result, setResult] = useState<ATSAnalysis | null>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function loadData() {
    setLoading(true);
    setError("");

    try {
      const [resumeData, analysisData] = await Promise.all([
        resumeService.getResumes(),
        resumeService.getAnalysisHistory(),
      ]);

      setResumes(resumeData);
      setAnalyses(analysisData);

      setSelectedResumeId((current) => {
        if (current && resumeData.some((r) => r.id === current)) {
          return current;
        }

        return resumeData[0]?.id || "";
      });
    } catch (err) {
      console.error("Resume data loading error:", err);
      setError("Unable to load resume data. Please refresh the page.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadData();
  }, []);

  async function handleUpload() {
    if (!selectedFile) {
      setError("Please select a PDF or DOCX file first.");
      return;
    }

    setError("");
    setMessage("");
    setUploading(true);

    try {
      const uploadedResume = await resumeService.uploadResume(selectedFile);

      setResumes((current) => [uploadedResume, ...current]);
      setSelectedResumeId(uploadedResume.id);
      setSelectedFile(null);
      setMessage("Resume uploaded successfully.");
    } catch (err) {
      console.error("Resume upload error:", err);
      setError("Resume upload failed. Check the file format and try again.");
    } finally {
      setUploading(false);
    }
  }

  async function handleAnalyze(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedResumeId) {
      setError("Please upload or select a resume first.");
      return;
    }

    if (jobDescription.trim().length < 30) {
      setError("Please enter a job description with at least 30 characters.");
      return;
    }

    setError("");
    setMessage("");
    setAnalyzing(true);
    setResult(null);

    try {
      const analysis = await resumeService.analyzeResume({
        resumeId: selectedResumeId,
        jobDescription: jobDescription.trim(),
      });

      setResult(analysis);
      setAnalyses((current) => [analysis, ...current]);
      setMessage("Resume analysis completed successfully.");
    } catch (err) {
      console.error("ATS analysis error:", err);
      setError("Analysis failed. Please check your resume and try again.");
    } finally {
      setAnalyzing(false);
    }
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this analysis?"
    );

    if (!confirmed) return;

    try {
      await resumeService.deleteAnalysis(id);

      setAnalyses((current) =>
        current.filter((analysis) => analysis.id !== id)
      );

      if (result?.id === id) {
        setResult(null);
      }

      setMessage("Analysis deleted successfully.");
    } catch (err) {
      console.error("Analysis deletion error:", err);
      setError("Unable to delete this analysis.");
    }
  }

  if (loading) {
    return (
      <section className="resume-analyzer">
        <p className="resume-message">Loading Resume Analyzer...</p>
      </section>
    );
  }

  return (
    <section className="resume-analyzer" id="resume">
      <div className="resume-header">
        <span className="eyebrow">CAREERPILOT AI · RESUME TOOLS</span>
        <h2>Resume Analyzer</h2>
        <p>
          Compare your resume with a job description and discover
          which skills match and which need improvement.
        </p>
      </div>

      {error && (
        <div className="resume-alert error" role="alert">
          {error}
        </div>
      )}

      {message && (
        <div className="resume-alert success" role="status">
          {message}
        </div>
      )}

      <div className="resume-panel">
        <h3>1. Upload your resume</h3>
        <p>Supported formats: PDF and DOCX. Maximum size: 5 MB.</p>

        <div className="resume-upload">
          <input
            type="file"
            accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={(event) =>
              setSelectedFile(event.target.files?.[0] || null)
            }
          />

          <button
            type="button"
            className="resume-button"
            onClick={handleUpload}
            disabled={!selectedFile || uploading}
          >
            {uploading ? "Uploading..." : "Upload Resume"}
          </button>
        </div>

        {selectedFile && (
          <p className="resume-file-name">
            Selected: {selectedFile.name}
          </p>
        )}
      </div>

      <form className="resume-panel" onSubmit={handleAnalyze}>
        <h3>2. Analyze against a job description</h3>

        <label htmlFor="resume-select">Select your resume</label>

        <select
          id="resume-select"
          value={selectedResumeId}
          onChange={(event) => setSelectedResumeId(event.target.value)}
          required
        >
          <option value="">Choose a resume</option>
          {resumes.map((resume) => (
            <option key={resume.id} value={resume.id}>
              {resume.title} — {resume.fileName}
            </option>
          ))}
        </select>

        <label htmlFor="job-description">Job description</label>

        <textarea
          id="job-description"
          value={jobDescription}
          onChange={(event) => setJobDescription(event.target.value)}
          placeholder="Paste the complete job description here..."
          rows={8}
          minLength={30}
          maxLength={15000}
          required
        />

        <div className="resume-form-footer">
          <small>{jobDescription.length}/15000 characters</small>

          <button
            type="submit"
            className="resume-button"
            disabled={analyzing || !selectedResumeId}
          >
            {analyzing ? "Analyzing..." : "Analyze Resume"}
          </button>
        </div>
      </form>

      {result && (
        <div className="resume-panel analysis-result">
          <h3>3. Analysis results</h3>

          <div className="score-display">
            <div className="score-circle">
              <strong>{result.score}%</strong>
              <span>Match score</span>
            </div>

            <div>
              <h4>Your resume match</h4>
              <p>
                {result.matchedSkills.length} matched skills and{" "}
                {result.missingSkills.length} missing skills detected.
              </p>
            </div>
          </div>

          <div className="skills-grid">
            <div className="skill-group">
              <h4>Matched skills</h4>
              {result.matchedSkills.length ? (
                <div className="skill-list">
                  {result.matchedSkills.map((skill) => (
                    <span className="skill-tag matched" key={skill}>
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p>No matching skills detected.</p>
              )}
            </div>

            <div className="skill-group">
              <h4>Missing skills</h4>
              {result.missingSkills.length ? (
                <div className="skill-list">
                  {result.missingSkills.map((skill) => (
                    <span className="skill-tag missing" key={skill}>
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p>No missing skills detected.</p>
              )}
            </div>
          </div>

          <div className="suggestions">
            <h4>Improvement suggestions</h4>
            <ul>
              {result.suggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="resume-panel">
        <h3>4. Analysis history</h3>

        {analyses.length === 0 ? (
          <p>No previous analyses yet.</p>
        ) : (
          <div className="analysis-history">
            {analyses.map((analysis) => (
              <article className="history-item" key={analysis.id}>
                <div>
                  <strong>{analysis.score}% match</strong>
                  <small>
                    {new Date(analysis.createdAt).toLocaleString()}
                  </small>
                </div>

                <div className="history-actions">
                  <button
                    type="button"
                    onClick={() => setResult(analysis)}
                  >
                    View
                  </button>

                  <button
                    type="button"
                    className="delete-button"
                    onClick={() => void handleDelete(analysis.id)}
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default ResumeAnalyzer;
