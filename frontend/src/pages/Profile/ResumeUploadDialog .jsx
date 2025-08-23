import { useState, useRef } from "react";
import {
  X,
  Upload,
  FileText,
  CheckCircle,
  Trash2,
  FileUp,
  Cloud,
  Loader2,
  Star,
  Shield,
  Clock,
} from "lucide-react";
import { userResumeUploadApi } from "../../API/api";
import { toast } from "react-toastify";

export const ResumeUploadDialog = ({ isOpen, onClose, onUpload }) => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [success, setSuccess] = useState("");
  const fileInputRef = useRef(null);

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const simulateUpload = async () => {
    setIsUploading(true);
    setUploadProgress(0);

    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      setUploadProgress(i);
    }

    setIsUploading(false);
    setSuccess("Resume uploaded successfully!");

    if (onUpload && uploadedFile) {
      onUpload(uploadedFile);
    }

    setTimeout(() => {
      onClose();
      resetDialog();
    }, 2000);
  };

  const handleUpload = () => {
    if (!uploadedFile) return;
    simulateUpload();
  };

  const removeFile = () => {
    setUploadedFile(null);
    setSuccess("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const resetDialog = () => {
    setUploadedFile(null);
    setSuccess("");
    setIsUploading(false);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = (type) => {
    if (type.includes("pdf"))
      return <FileText className="w-8 h-8 text-red-500" />;
    return <FileText className="w-8 h-8 text-blue-500" />;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Upload className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Upload Resume
              </h2>
              <p className="text-gray-600">
                Add your latest resume to your profile
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              onClose();
              resetDialog();
            }}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-green-700 font-medium">{success}</span>
            </div>
          )}

          {!uploadedFile ? (
            <div className="relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 border-gray-300 hover:border-blue-400 hover:bg-gray-50">
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileInputChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />

              <div className="flex flex-col items-center gap-4">
                <div className="p-4 bg-blue-100 rounded-full">
                  <Cloud className="w-12 h-12 text-blue-600" />
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Choose your resume
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Supports PDF, DOC, and DOCX files
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                >
                  <FileUp className="w-5 h-5" />
                  Choose File
                </button>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>Keep it updated</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>ATS-friendly format</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span>Recent experience</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {getFileIcon(uploadedFile.type)}
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">
                        {uploadedFile.name}
                      </h4>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                        <span>{formatFileSize(uploadedFile.size)}</span>
                        <span>•</span>
                        <span>Modified {new Date(uploadedFile.lastModified).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={removeFile}
                      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {isUploading && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Resume Tips
                </h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Include relevant keywords from job descriptions</li>
                  <li>• Keep it to 1-2 pages for optimal readability</li>
                  <li>• Use a clean, professional format</li>
                  <li>• Update your contact information</li>
                </ul>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-6 border-t border-gray-200 mt-6">
            <button
              type="button"
              onClick={() => {
                onClose();
                resetDialog();
              }}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
              disabled={isUploading}
            >
              Cancel
            </button>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleUpload}
                disabled={!uploadedFile || isUploading || success}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors min-w-[120px] justify-center"
              >
                {isUploading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Upload className="w-4 h-4" />
                )}
                {isUploading ? "Uploading..." : "Upload Resume"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Example usage component
export const ResumeUploadExample = () => {
  const [showDialog, setShowDialog] = useState(false);

  const handleResumeUpload = async (fileData) => {
    console.log("Resume uploaded:", fileData);
    try {
      const formData = new FormData();
      formData.append("resume", fileData);
      const res = await userResumeUploadApi(formData);
    if(res.data.message){
        toast.success(res.data.message||"resume upload scussfully")
    }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowDialog(true)}
        className="flex items-center gap-2 px-6 py-3 border border-blue-300 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
      >
        <Upload className="w-5 h-5" />
        Upload Resume
      </button>
      <ResumeUploadDialog
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
        onUpload={handleResumeUpload}
      />
    </>
  );
};
