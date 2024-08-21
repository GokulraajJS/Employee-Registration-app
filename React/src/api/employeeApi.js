


export const fetchEmployees = async () => {

    // console.log(import.meta.env.BASE_URL);
    

    try {
        const response = await fetch(`http://192.168.86.1:8000/api/employees/`);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const responseData = await response.json();

        // Extract the 'data' array from the response
        const data = responseData.data;

        console.log('Fetched employees:', data);
        
        // Log the response for debugging
        // const responseText = await response.text();
        // console.log("Response Text:", responseText);
        
        return data;
    } catch (error) {
        console.error("There was an error fetching the employees!", error);
        return [];
    }
};

export const createEmployee = async (employeeData) => {
    try {
        const response = await fetch(`http://192.168.86.1:8000/api/employees/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(employeeData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { success: false, errors: errorData };
        }

        return { success: true, data: await response.json() };
    } catch (error) {
        console.error("Error creating employee:", error);
        return { success: false, errors: { general: 'An error occurred. Please try again.' } };
    }
};