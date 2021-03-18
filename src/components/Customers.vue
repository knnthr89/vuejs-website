<template>
    <div class="row">
        <div class="col-md-12">
            <b-button v-b-modal.modal-1 class="btn-success float-right mr-4 mb-3">Add new Customer</b-button>
            <b-modal id="modal-1" title="Add new customer" hide-footer="true">
                <div class="col-md-12">
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
                <div class="form-group col-md-5 float-right mt-4">
                    <button class="btn btn-success btn-block">Add</button>
                </div>
                </form>
                </div>
            </b-modal>
            <b-modal id="modal-2" title="Edit customer" hide-footer="true">
                <div class="col-md-12">
                <form @submit.prevent="onUpdateForm">
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" class="form-control" v-model="editCustomer.name" required>
                </div>

                <div class="form-group">
                    <label>Email</label>
                    <input type="email" class="form-control" v-model="editCustomer.email" required>
                </div>

                <div class="form-group">
                    <label>Phone</label>
                    <input type="text" class="form-control" v-model="editCustomer.phone" required>
                </div>

                 <div class="form-group">
                    <label>Address</label>
                    <input type="text" class="form-control" v-model="editCustomer.address" required>
                </div>

                 <div class="form-group">
                    <label>RFC</label>
                    <input type="text" class="form-control" v-model="editCustomer.rfc" required>
                </div>
                <div class="form-group col-md-5 float-right mt-4">
                    <button class="btn btn-warning text-white btn-block">Edit</button>
                </div>
                </form>
                </div>
            </b-modal>
            <table class="table table-striped mx-auto">
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
                            <b-button v-b-modal.modal-2 @click="edCustomer(customer.key)" class="btn btn-warning text-white btn-space mr-2">Edit</b-button>
                            <button @click.prevent="deleteCustomer(customer.key)" class="btn btn-danger btn-space mr-2">Delete</button>
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
                Customers: [],
                 customer: {},
                editCustomer : {}
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
            },
            onFormSubmit(event) { 
                event.preventDefault();
               db.collection('customers').add(this.customer).then(() => {
                 alert("Customer successfully created!");
                 this.customer = {
                      name: '',
                     email: '',
                    phone: '',
                    address: '',
                     rfc: ''
                 }
               }).catch((error) => {
                   alert(error);
               })
            },
            edCustomer(id){
                let dbRef = db.collection('customers').doc(id);
                dbRef.get().then((doc) => {
                    
                this.editCustomer = doc.data();
                this.editCustomer.id = id;
                
             }).catch((error) => {
                console.log(error)
            })
              },
              onUpdateForm(event) {
                event.preventDefault();
                db.collection('customers').doc(this.editCustomer.id)
                .update(this.editCustomer).then(() => {
                    console.log("Customer successfully updated!");
                     this.$router.push('/customers');
                    }).catch((error) => {
                    console.log(error);
                });
                }
            },
        }
</script>

<style>
    .btn-primary {
        margin-right: 12px;
    }
</style>