const { StudentList } = require( "../FakeData" )
const _ = require("lodash");

const resolvers = {
    Query: {
        students: () => {
            return StudentList;
        },

        student: (v, args) => {
            const name = args.name ;
            // const user = _.find(StudentList, {name: name})
            const user = _.find(StudentList, { name })
            return user
        },
    },

    Mutation: {
        createStudent: (v, args) => {
          const student = args.input;
          // console.log(StudentList)
          const lastId = StudentList.length === 0 ? 1 : StudentList[StudentList.length - 1].id;
          student.id = lastId + 1;
          StudentList.push(student);
          return student;
        },
    
        updateName: (v, args) => {
          const { id, newName } = args.input;
          let studentUpdated;
          StudentList.forEach((student) => {
            if (student.id === Number(id)) {
                student.name = newName;
                studentUpdated = student;
            }
          });
    
          return studentUpdated;
        },
    
        deleteStudent: (v, args) => {
          const id = args.id;
          _.remove(StudentList, (student) => student.id === Number(id));
          return null;
        },
      },

};

module.exports = { resolvers };

/*

# query getAllStudents {
#   students {
#     id
#     name 
#     age
#     major
#     friends {
#      name 
#     }
#   }
# }


# query GetStudent($studentName: String!) {
#   student(name: $studentName) {
#     id
#     age
#     major 
#     name 
#   }
# }

# mutation CreateStudent($createStudentInput: CreateStudentInput!){
#   createStudent(input: $createStudentInput) {
#     id
#     name
#     age
#     major
#   }
# }

# {
#  "createStudentInput": {
   
#     "name": "Lijun",
#     "age": 21,
#     "major": "cs"
#   }
# }


# mutation UpdateName($updateNameInput: UpdateNameInput!){
#   updateName(input: $updateNameInput) {
#       id
#       name
#   }
# }

# {
#  "updateNameInput": {
#     "id": "5",
#     "newName": "Lijun"
#   }
# }

mutation($deleteStudent: ID!){
#   deleteStudent(id: $deleteStudent) {
#     id
#   }
# }

# {
#   "deleteStudent": "5"
# }


*/
