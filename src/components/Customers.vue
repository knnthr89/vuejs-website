<!--<template>
    <div class="row justify-content-center">
        <div class="col-md-5">
            <h3 class="text-center">Add Customer</h3>
            <form @submit.prevent="onFormSubmit">
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" class="form-control" v-model="customer.name" required>
                </div>

                <div class="form-group">
                    <label>Email</label>
                    <input type="email" class="form-control" v-model="customer.email" required>
                </div>

                <div class="form-group">
                    <label>Phone</label>
                    <input type="text" class="form-control" v-model="customer.phone" required>
                </div>

                 <div class="form-group">
                    <label>Address</label>
                    <input type="text" class="form-control" v-model="customer.address" required>
                </div>

                 <div class="form-group">
                    <label>RFC</label>
                    <input type="text" class="form-control" v-model="customer.rfc" required>
                </div>


                <div class="form-group">
                    <button class="btn btn-primary btn-block">Add Customer</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>

import { db } from '../main';

    export default {
        data() {
            return {
                customer: {
                   name: '',
                   email: '',
                   phone: '',
                   address: '',
                   rfc: ''
                }
            }
        },
        methods: {
            onFormSubmit(event) { 
               //alert(JSON.stringify(this.user)) 
               event.preventDefault();
               db.collection('customers').add(this.customer).then(() => {
                 alert("Customer successfully created!");
               }).catch((error) => {
                   alert(error);
               })
            }
        }
    }
</script>-->
<template>
    <div class="row">
        <div class="col-md-12">
            <button class="btn btn-success float-right mr-4 mb-3">Add</button>
            <table class="table table-striped mr-5">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>RFC</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="customer in Customers" :key="customer.key">
                        <td>{{ customer.name }}</td>
                        <td>{{ customer.email }}</td>
                        <td>{{ customer.phone }}</td>
                        <td>{{ customer.address }}</td>
                        <td>{{ customer.rfc }}</td>
                        <td>
                            <router-link :to="{name: 'edit', params: { id: customer.key }}" class="btn btn-primary">Edit
                            </router-link>
                            <button @click.prevent="deleteCustomer(customer.key)" class="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import { db } from '../main';
    
    export default {
        data() {
            return {
                Customers: []
            }
        },
        created() {
            db.collection('customers').onSnapshot((snapshotChange) => {
                this.Customers = [];
                snapshotChange.forEach((doc) => {
                    this.Customers.push({
                        key: doc.id,
                        name: doc.data().name,
                        email: doc.data().email,
                        phone: doc.data().phone,
                        address: doc.data().address,
                        rfc: doc.data().rfc
                    })
                });
            })
        },
        methods: {
            deleteCustomer(id){
              if (window.confirm("Do you really want to delete?")) {
                db.collection("customers").doc(id).delete().then(() => {
                    console.log("Document deleted!");
                })
                .catch((error) => {
                    console.error(error);
                })
              }
            }
        }
    }
</script>

<style>
    .btn-primary {
        margin-right: 12px;
    }
</style>