'use client'

import { useState, useRef, useCallback } from 'react';
import Head from 'next/head';
import { Upload, X, FileText, Check, AlertCircle, Loader, ChevronDown, ChevronUp, Download } from 'lucide-react';

export default function MaterialUploadPage() {
    const [files, setFiles] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadComplete, setUploadComplete] = useState(false);
    const [documentSummary, setDocumentSummary] = useState(null);
    const [expandedSections, setExpandedSections] = useState({});

    const fileInputRef = useRef(null);

    // Supported file types
    const supportedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'text/plain'
    ];

    // Max file size in bytes (20MB)
    const maxFileSize = 20 * 1024 * 1024;

    const handleDragEnter = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isDragging) {
            setIsDragging(true);
        }
    }, [isDragging]);

    const validateFile = (file) => {
        if (!supportedTypes.includes(file.type)) {
            alert(`File type not supported: ${file.type}`);
            return false;
        }

        if (file.size > maxFileSize) {
            alert(`File too large: ${(file.size / (1024 * 1024)).toFixed(2)}MB. Maximum size is ${maxFileSize / (1024 * 1024)}MB.`);
            return false;
        }

        return true;
    };

    const processFiles = (fileList) => {
        const validFiles = [];

        for (let i = 0; i < fileList.length; i++) {
            const file = fileList[i];
            if (validateFile(file)) {
                validFiles.push({
                    file,
                    id: `file-${Date.now()}-${i}`,
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    progress: 0,
                    error: null,
                    uploaded: false
                });
            }
        }

        if (validFiles.length > 0) {
            setFiles(prev => [...prev, ...validFiles]);
        }
    };

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const droppedFiles = e.dataTransfer.files;
        if (droppedFiles.length > 0) {
            processFiles(droppedFiles);
        }
    }, []);

    const handleFileInputChange = (e) => {
        const selectedFiles = e.target.files;
        if (selectedFiles.length > 0) {
            processFiles(selectedFiles);
        }
    };

    const removeFile = (fileId) => {
        setFiles(files.filter(file => file.id !== fileId));
    };

    const uploadFiles = async () => {
        if (files.length === 0) return;

        setIsUploading(true);

        const updatedFiles = [...files];

        for (let i = 0; i < updatedFiles.length; i++) {
            if (updatedFiles[i].uploaded) continue;

            for (let progress = 0; progress <= 100; progress += 10) {
                updatedFiles[i].progress = progress;
                setFiles([...updatedFiles]);
                await new Promise(resolve => setTimeout(resolve, 200));
            }

            updatedFiles[i].uploaded = true;
        }

        setIsUploading(false);
        setUploadComplete(true);

        setTimeout(() => {
            setDocumentSummary({
                title: "Introduction to Machine Learning",
                pageCount: 42,
                wordCount: 15240,
                lastModified: "2025-03-20",
                mainTopics: [
                    {
                        title: "Supervised Learning",
                        subtopics: [
                            "Classification Algorithms",
                            "Regression Techniques",
                            "Evaluation Metrics"
                        ],
                        keyPoints: [
                            "Supervised learning uses labeled data to train models",
                            "Common algorithms include decision trees, SVMs, and neural networks",
                            "Cross-validation helps prevent overfitting"
                        ]
                    },
                    {
                        title: "Unsupervised Learning",
                        subtopics: [
                            "Clustering Methods",
                            "Dimensionality Reduction",
                            "Anomaly Detection"
                        ],
                        keyPoints: [
                            "Unsupervised learning works with unlabeled data",
                            "K-means is a popular clustering algorithm",
                            "PCA helps reduce feature dimensions while preserving variance"
                        ]
                    },
                    {
                        title: "Reinforcement Learning",
                        subtopics: [
                            "Q-Learning",
                            "Policy Gradients",
                            "Multi-armed Bandits"
                        ],
                        keyPoints: [
                            "RL involves agents learning through interaction with environments",
                            "Rewards and penalties guide the learning process",
                            "Applications include game playing and robotics"
                        ]
                    }
                ],
                keyTerms: [
                    { term: "Overfitting", definition: "When a model learns the training data too well, including noise and outliers" },
                    { term: "Feature Engineering", definition: "The process of selecting and transforming variables for model training" },
                    { term: "Hyperparameter", definition: "Model configuration settings that are not learned during training" },
                    { term: "Cross-validation", definition: "Technique to evaluate model performance on unseen data" },
                    { term: "Gradient Descent", definition: "Optimization algorithm used to minimize the loss function" }
                ],
                summary: "This document provides a comprehensive introduction to machine learning concepts, methodologies, and applications. It covers the three main paradigms: supervised learning, unsupervised learning, and reinforcement learning. The material explains fundamental algorithms, evaluation techniques, and practical considerations for implementing machine learning solutions. Case studies and examples illustrate real-world applications across various domains including healthcare, finance, and computer vision. The document also addresses common challenges in machine learning projects and strategies to overcome them."
            });
        }, 2000);
    };

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const formatFileSize = (bytes) => {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    const getFileIcon = (fileType) => {
        if (fileType.includes('pdf')) return '📄';
        if (fileType.includes('word')) return '📝';
        if (fileType.includes('presentation')) return '📊';
        if (fileType.includes('text')) return '📃';
        return '📄';
    };

    return (
        <>
            <Head>
                <title>Upload Study Materials | StudyBuddy AI</title>
                <meta
                    name="description"
                    content="Upload your study materials to StudyBuddy AI for AI-powered analysis and personalized learning"
                />
            </Head>

            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Upload Study Materials</h1>
                        <p className="mt-3 text-xl text-gray-600">
                            Upload your documents to get AI-powered summaries, practice questions, and personalized learning content
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        {!uploadComplete ? (
                            <div className="p-8">
                                <div
                                    className={`border-2 border-dashed rounded-lg p-12 text-center ${isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'
                                        } transition-colors duration-200 ease-in-out`}
                                    onDragEnter={handleDragEnter}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                >
                                    <div className="flex flex-col items-center justify-center">
                                        <Upload className="h-12 w-12 text-indigo-500 mb-4" />
                                        <h3 className="text-lg font-medium text-gray-900 mb-1">
                                            {isDragging ? 'Drop your files here' : 'Drag and drop your files here'}
                                        </h3>
                                        <p className="text-gray-500 mb-6">or</p>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            multiple
                                            onChange={handleFileInputChange}
                                            className="hidden"
                                            accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current.click()}
                                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
                                        >
                                            Browse Files
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-3">Supported File Types</h3>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-3 py-1 bg-gray-100 rounded-full text-gray-700 text-sm">PDF (.pdf)</span>
                                        <span className="px-3 py-1 bg-gray-100 rounded-full text-gray-700 text-sm">Word (.doc, .docx)</span>
                                        <span className="px-3 py-1 bg-gray-100 rounded-full text-gray-700 text-sm">PowerPoint (.ppt, .pptx)</span>
                                        <span className="px-3 py-1 bg-gray-100 rounded-full text-gray-700 text-sm">Text (.txt)</span>
                                    </div>
                                    <p className="mt-2 text-sm text-gray-500">Maximum file size: 20MB per file</p>
                                </div>

                                {files.length > 0 && (
                                    <div className="mt-8">
                                        <h3 className="text-lg font-medium text-gray-900 mb-3">Selected Files</h3>
                                        <ul className="divide-y divide-gray-200">
                                            {files.map(file => (
                                                <li key={file.id} className="py-4 flex items-center">
                                                    <div className="flex-shrink-0 text-2xl mr-3">
                                                        {getFileIcon(file.type)}
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                                                            <button
                                                                type="button"
                                                                onClick={() => removeFile(file.id)}
                                                                className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                                                                disabled={isUploading}
                                                            >
                                                                <X className="h-5 w-5" />
                                                            </button>
                                                        </div>
                                                        <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                                                        {file.progress > 0 && (
                                                            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                                                <div
                                                                    className={`h-2 rounded-full ${file.uploaded ? 'bg-green-500' : 'bg-indigo-500'}`}
                                                                    style={{ width: `${file.progress}%` }}
                                                                ></div>
                                                            </div>
                                                        )}
                                                        {file.uploaded && (
                                                            <p className="text-xs text-green-500 mt-1 flex items-center">
                                                                <Check className="h-3 w-3 mr-1" /> Upload complete
                                                            </p>
                                                        )}
                                                        {file.error && (
                                                            <p className="text-xs text-red-500 mt-1 flex items-center">
                                                                <AlertCircle className="h-3 w-3 mr-1" /> {file.error}
                                                            </p>
                                                        )}
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="mt-6">
                                            <button
                                                type="button"
                                                onClick={uploadFiles}
                                                disabled={isUploading || files.length === 0 || files.every(f => f.uploaded)}
                                                className={`w-full px-4 py-3 flex justify-center items-center rounded-md ${isUploading || files.length === 0 || files.every(f => f.uploaded)
                                                    ? 'bg-gray-300 cursor-not-allowed'
                                                    : 'bg-indigo-600 hover:bg-indigo-700'
                                                    } text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors`}
                                            >
                                                {isUploading ? (
                                                    <>
                                                        <Loader className="animate-spin h-5 w-5 mr-2" />
                                                        Uploading...
                                                    </>
                                                ) : files.every(f => f.uploaded) ? (
                                                    <>
                                                        <Check className="h-5 w-5 mr-2" />
                                                        All Files Uploaded
                                                    </>
                                                ) : (
                                                    'Upload Files'
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="p-8">
                                {documentSummary ? (
                                    <div>
                                        <div className="mb-6">
                                            <h2 className="text-2xl font-bold text-gray-900">{documentSummary.title}</h2>
                                            <div className="mt-2 text-sm text-gray-600 flex space-x-4">
                                                <span>Pages: {documentSummary.pageCount}</span>
                                                <span>Words: {documentSummary.wordCount}</span>
                                                <span>Last Modified: {documentSummary.lastModified}</span>
                                            </div>
                                        </div>

                                        <div className="mb-8">
                                            <h3 className="text-xl font-bold text-gray-900 mb-4">Main Topics</h3>
                                            {documentSummary.mainTopics.map((topic, index) => (
                                                <div key={index} className="mb-4">
                                                    <div
                                                        className="flex justify-between items-center cursor-pointer"
                                                        onClick={() => toggleSection(`topic-${index}`)}
                                                    >
                                                        <h4 className="text-lg font-semibold text-gray-800">{topic.title}</h4>
                                                        {expandedSections[`topic-${index}`] ? (
                                                            <ChevronUp className="h-5 w-5 text-gray-400" />
                                                        ) : (
                                                            <ChevronDown className="h-5 w-5 text-gray-400" />
                                                        )}
                                                    </div>

                                                    {expandedSections[`topic-${index}`] && (
                                                        <div className="px-6 pb-4 pt-2 bg-gray-50">
                                                            <div className="mb-4">
                                                                <h4 className="text-sm font-semibold text-gray-900 mb-2">Subtopics</h4>
                                                                <ul className="list-disc list-inside space-y-1">
                                                                    {topic.subtopics.map((subtopic, subIndex) => (
                                                                        <li key={subIndex} className="text-gray-700 text-sm">
                                                                            {subtopic}
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>

                                                            <div>
                                                                <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Points</h4>
                                                                <ul className="list-disc list-inside space-y-1">
                                                                    {topic.keyPoints.map((point, pointIndex) => (
                                                                        <li key={pointIndex} className="text-gray-700 text-sm">
                                                                            {point}
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mb-8">
                                            <h3 className="text-xl font-bold text-gray-900 mb-4">Key Terms</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {documentSummary.keyTerms.map((term, index) => (
                                                    <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                                                        <dt className="font-medium text-gray-900">{term.term}</dt>
                                                        <dd className="mt-1 text-gray-700 text-sm">{term.definition}</dd>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="border-t border-gray-200 pt-6">
                                            <div className="flex justify-end space-x-4">
                                                <button
                                                    type="button"
                                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
                                                >
                                                    Generate Practice Questions
                                                </button>
                                                <button
                                                    type="button"
                                                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                                                >
                                                    Create Study Plan
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="p-8 text-center">
                                        <Loader className="animate-spin h-12 w-12 text-indigo-600 mx-auto mb-4" />
                                        <p className="text-gray-600">Analyzing your document and generating summary...</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}