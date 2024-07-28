import React from 'react';
import PropTypes from 'prop-types';
import './MessageDialog.css';

const MessageDialog = ({ open, onClose, title, message, type }) => {
  const dialogClass = `MessageDialog ${type}`; // Dynamically assign class based on type (success or error)

  return (
    open && (
      <div className={dialogClass}>
        <h2>{title}</h2>
        <p dangerouslySetInnerHTML={{ __html: message }}></p>
        <button 
          onClick={onClose} 
          className={type === 'success' ? 'success-button' : 'error-button'}
        >
          Close
        </button>
      </div>
    )
  );
};

MessageDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error']).isRequired,
};

export default MessageDialog;
