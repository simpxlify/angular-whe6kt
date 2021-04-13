import { Component, VERSION } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(private formBuilder: FormBuilder) {}
  name = "Angular " + VERSION.major;
  profileForm = this.formBuilder.group({
    file: [""],
    name: ["", [Validators.required, Validators.pattern("[a-zA-Z ]*")]],
    email: [
      "",
      [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]
    ],
    password: [
      "",
      [
        Validators.required,
        Validators.minLength(7),
        Validators.pattern(
          "(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>\"'\\;:{\\}\\[\\]\\|\\+\\-\\=\\_\\)\\(\\)\\`\\/\\\\\\]])[A-Za-z0-9d$@].{7,}"
        )
      ]
    ],
    password2: ["", Validators.required],
    nif: ["", [Validators.required, Validators.pattern("\\d{9}")]],
    birthDate: [
      "",
      [
        Validators.required,
        Validators.pattern(
          "^(0[1-9]|[12][0-9]|3[01])[/.](0[1-9]|1[012])[/.](19|20)\\d\\d$"
        )
      ]
    ],
    phoneNumber: ["", [Validators.required, Validators.pattern("\\d{9}")]],
    updateAddress: this.formBuilder.array([], Validators.required)
  });

  newAddress(): FormGroup {
    return this.formBuilder.group({
      address: ["", Validators.required],
      address2: ["", Validators.required],
      postalCode: ["", Validators.required],
      city: ["", Validators.required],
      area: ["", Validators.required]
    });
  }
  get updateAddress(): FormArray {
    return this.profileForm.get("updateAddress") as FormArray;
  }
  addAddress() {
    this.updateAddress.push(this.newAddress());
  }
  removeAddress(id) {
    this.updateAddress.removeAt(id);
  }

  ngOnInit() {
    this.addAddress();
  }
}
