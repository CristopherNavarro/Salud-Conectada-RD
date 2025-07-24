export async function handleAppointmentSubmission(prevState: any, data: any) { // Changed to accept data object
  try {
    const response = await fetch('https://kirki.app.n8n.cloud/webhook-test/pacientes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // Sending the data object directly
    });

    if (response.ok) {
      return { message: '¡Gracias! Tu cita ha sido registrada.', status: 'success' };
    } else {
      return { message: 'Hubo un error al registrar tu cita. Inténtalo de nuevo.', status: 'error' };
    }
  } catch (error) {
    console.error('Error submitting appointment form:', error);
    return { message: 'Hubo un error al registrar tu cita. Inténtalo de nuevo.', status: 'error' };
  }
}

export async function handleVolunteerSubmission(prevState: any, data: any) { // Changed to accept data object

  try {
    const response = await fetch('https://kirki.app.n8n.cloud/webhook-test/voluntarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // Sending the data object directly
    });

    if (response.ok) {
      return { message: '¡Gracias por tu interés! Hemos recibido tu información.', status: 'success' };
    } else {
      return { message: 'Hubo un error al enviar tu información. Inténtalo de nuevo.', status: 'error' };
    }
  } catch (error) {
    console.error('Error submitting volunteer form:', error);
    return { message: 'Hubo un error al enviar tu información. Inténtalo de nuevo.', status: 'error' };
  }
}

export async function handleDonationSubmission(prevState: any, data: any) { // Changed to accept data object

  try {
    const response = await fetch('https://kirki.app.n8n.cloud/webhook-test/donaciones', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // Sending the data object directly including email
    });

    if (response.ok) {
      return { message: '¡Gracias por tu donación!', status: 'success' };
    } else {
      return { message: 'Hubo un error al procesar tu donación. Inténtalo de nuevo.', status: 'error' };
    }
  } catch (error) {
    console.error('Error submitting donation form:', error);
    return { message: 'Hubo un error al procesar tu donación. Inténtalo de nuevo.', status: 'error' };
  }
}