import React from 'react';
import { Form, Formik } from 'formik';
import { Box, Button } from '@chakra-ui/react';
import Wrapper from '../components/Wrapper';
import InputField from '../components/InputField';
import { useMutation } from 'urql';

interface registerProps {
    
};

const REGISTER_MUTATION = `
    mutation Register($username: String!, $password: String!) {
        register(options: { username: $username, password: $password } ) {
          errors {
            field
            message
          }
          user {
            id
            username
          }
        }
      }
    `;

const Register:React.FC<registerProps> = () => {
    const [result, executeMutation] = useMutation(REGISTER_MUTATION); //urql hook
    return (
        <Wrapper variant="small">
            <Formik initialValues={{ username: "", password: ""}} onSubmit={async (values) => {
                console.log(values);
                const response = await executeMutation(values);
                console.log(response);
                return response;
            }}>
                {( { isSubmitting } ) => (
                    <Form>
                        <InputField name="username" placeholder="username" label="Username" />
                        <Box mt={4}>
                            <InputField name="password" placeholder="password" label="Password" type="password" />
                        </Box>
                        <Button mt={4} type="submit" colorScheme="teal" isLoading={isSubmitting}>Register</Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
}

export default Register;
