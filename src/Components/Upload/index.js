import React, { useState, useEffect } from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImageAction, uploadImageFileAction } from '../../redux/actions/common';

const DynamicUploadComponent = ({ filename, path, accept, type, onUpload }) => {
    const [mainFile, setMainFile] = useState(null);
    const [uploadedFileName, setUploadedFileName] = useState(null);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const resumeFileURLReqData = useSelector(state => state.uploadImageReducer);

    const beforeUpload = (file) => {
        setMainFile(file);
        const format = file?.name?.split('.').pop()?.toLowerCase();

        setUploadedFileName(`${path}${file?.uid}${filename}.${format}`);

        // Dispatch action to upload file data
        dispatch(uploadImageAction({ documentName: `${path}${file?.uid}${filename}`, format: format }));

        return false; // Prevent automatic upload
    };

    useEffect(() => {
        const { data, loading: requestLoading, error } = resumeFileURLReqData;
        setLoading(requestLoading);

        if (data && data.url && data.url.includes(uploadedFileName)) {
            const reqData = { url: data.url, fileData: mainFile };
            dispatch(uploadImageFileAction(reqData));
            message.success(`${type} uploaded successfully`);
            if (typeof onUpload === 'function') {
                onUpload(uploadedFileName);
            }
        }
    }, [dispatch, mainFile, uploadedFileName, resumeFileURLReqData]);

    return (
        <Upload.Dragger
            multiple={false}
            beforeUpload={beforeUpload}
            maxCount={1} // Change this if you want to allow multiple files
            accept={accept} // Pass accept props
            className="candidate-db-wcS1q"
        >
            <p className="ant-upload-drag-icon">
                <UploadOutlined />
            </p>
            <label
            >
                <span
                    className="candidate-db-2de5X candidate-db-14TuV  candidate-db-1JsWJ "
                >
                    Upload a {type}
                </span>{" "}
                <span className="candidate-db-2TdGW  candidate-db-f-uLT">
                    or drag and drop here
                </span>
            </label>
            {/* <Button icon={<UploadOutlined />} loading={loading}>Upload{" "} {type}</Button> */}
        </Upload.Dragger>
    );
};

export default DynamicUploadComponent;
