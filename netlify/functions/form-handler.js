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
        reason,
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
        !validPurposes.includes(reason)) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Invalid input data' }),
        };
    }

    // Additional validation for 'other' purpose
    if (reason === 'other' && !purposeOther?.trim()) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Please specify the purpose' }),
        };
    }

    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    console.log(secretKey);
    console.log(recaptchaResponse);

    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaResponse}`;

    const recaptchaRes = await fetch(verificationUrl, { method: 'POST' });
    const recaptchaData = await recaptchaRes.json();
    console.log(recaptchaData);
    if (!recaptchaData.success) {
        return {
            statusCode: 400,
            // body: JSON.stringify({ error: 'CAPTCHA verification failed' }),
            body: JSON.stringify({ error: 'CAPTCHA verification failed', details: recaptchaData['error-codes'] }),
        };
    }

    const msg = {
        to: 'babak.bandpey@gmail.com',
        from: 'bb@cocode.dk',
        subject: `Contact request from ${name}`,
        text: `Name: ${name}
Email: ${email}
Phone: ${phone}
Purpose: ${reason === 'other' ? `Other (${purposeOther})` : reason}
Message: ${message}`,
        html: `<strong>Name:</strong> ${name}<br>
<strong>Email:</strong> ${email}<br>
<strong>Phone:</strong> ${phone}<br>
<strong>Purpose:</strong> ${reason === 'other' ? `Other (${purposeOther})` : reason}<br>
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
