export async function handleAppointmentSubmission(prevState: any, data: any) {
  try {
    // Formatear el número de teléfono
    const formattedPhone = `1${data.telefono.replace(/\D/g, '')}`;
    const dataToSend = { ...data, telefono: formattedPhone };

    const response = await fetch('https://monkey-adapting-cub.ngrok-free.app/webhook/pacientes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend), // Enviamos el objeto con el teléfono formateado
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

export async function handleVolunteerSubmission(prevState: any, data: any) {
  try {
    // Formatear el número de teléfono
    const formattedPhone = `1${data.telefono.replace(/\D/g, '')}`;
    const dataToSend = { ...data, telefono: formattedPhone };

    const response = await fetch('https://monkey-adapting-cub.ngrok-free.app/webhook/voluntarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend), // Enviamos el objeto con el teléfono formateado
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

export async function handleDonationSubmission(prevState: any, data: any) {
  try {
    // Formatear el número de teléfono de contacto
    const formattedPhone = `1${data.telefonoContacto.replace(/\D/g, '')}`;
    const dataToSend = { ...data, telefonoContacto: formattedPhone };

    const response = await fetch('https://monkey-adapting-cub.ngrok-free.app/webhook/donaciones', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend), // Enviamos el objeto con el teléfono formateado
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

// === FUNCIÓN AÑADIDA PARA CORREGIR EL ERROR ===
export async function handleChatSubmission(prevState: any, data: any) {
  try {
    // Creamos un objeto para enviar, asumiendo que puede tener un teléfono
    let dataToSend = { ...data };

    // Si el chatbot recoge un número de teléfono, también lo formateamos
    if (data.telefono) {
        const formattedPhone = `1${data.telefono.replace(/\D/g, '')}`;
        dataToSend = { ...dataToSend, telefono: formattedPhone };
    }

    // He asumido una URL de webhook para el chat. ¡Asegúrate de que sea la correcta!
    const response = await fetch('https://monkey-adapting-cub.ngrok-free.app/webhook/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    });

    if (response.ok) {
      return { message: 'Mensaje enviado.', status: 'success' };
    } else {
      return { message: 'Error al enviar el mensaje.', status: 'error' };
    }
  } catch (error) {
    console.error('Error submitting chat form:', error);
    return { message: 'Error al enviar el mensaje.', status: 'error' };
  }
}