const Feedback = require('./feedbackschema');

const saveFeedback = async (name, email, subject, message) => {
  try {
    // Create a new feedback document
    const feedback = new Feedback({ name, email, subject, message });

    // Save the feedback to the database
    await feedback.save();

    return { message: 'Thank you for your feedback!' };
  } catch (error) {
    console.error('Error saving feedback:', error);
    let err = new Error('Failed to save feedback.');
    err.status = 540;
    throw err;
  }
};

module.exports = saveFeedback;