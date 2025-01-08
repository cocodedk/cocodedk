import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method Not Allowed' }),
        };
    }

    const {
        name,
        email,
        phone,
        message,
        purpose,
        purposeOther,
        'g-recaptcha-response': recaptchaResponse
    } = JSON.parse(event.body);

    // Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9+ -]+$/;
    const nameRegex = /^[\p{L}\s]+$/u;
    const validPurposes = ['software', 'ai', 'security', 'consulting', 'other'];

    if (!name.trim() ||
        !nameRegex.test(name) ||
        !emailRegex.test(email) ||
        !phoneRegex.test(phone) ||
        !validPurposes.includes(purpose)) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Invalid input data' }),
        };
    }

    // Additional validation for 'other' purpose
    if (purpose === 'other' && !purposeOther?.trim()) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Please specify the purpose' }),
        };
    }

    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaResponse}`;

    const recaptchaRes = await fetch(verificationUrl, { method: 'POST' });
    const recaptchaData = await recaptchaRes.json();

    if (!recaptchaData.success) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'CAPTCHA verification failed' }),
        };
    }

    const msg = {
        to: 'babak.bandpey@gmail.com',
        from: 'bb@cocode.dk',
        subject: `Contact request from ${name}`,
        text: `Name: ${name}
Email: ${email}
Phone: ${phone}
Purpose: ${purpose === 'other' ? `Other (${purposeOther})` : purpose}
Message: ${message}`,
        html: `<strong>Name:</strong> ${name}<br>
<strong>Email:</strong> ${email}<br>
<strong>Phone:</strong> ${phone}<br>
<strong>Purpose:</strong> ${purpose === 'other' ? `Other (${purposeOther})` : purpose}<br>
<strong>Message:</strong> ${message}`,
    };

    try {
        await sgMail.send(msg);
        console.log('Email sent');
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Form submitted successfully' }),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to send email' }),
        };
    }
};
