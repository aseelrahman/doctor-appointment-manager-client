import { auth } from "@/lib/auth";
import { Envelope, Pencil } from "@gravity-ui/icons";
import { Avatar, Button, Card } from "@heroui/react";
import { headers } from "next/headers";
import UpdateProfileModal from "./UpdateProfileModal";

const MyProfile = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  return (
    <div>
      <h1 className="mb-5 text-2xl font-bold">My Profile</h1>

      <Card className="max-w-lg">
        <Card.Content className="flex items-center gap-5">
          <Avatar size="lg">
            <Avatar.Image alt={user?.name} src={user?.image} />
            <Avatar.Fallback>
              {user.name.charAt(0).toUpperCase()}
            </Avatar.Fallback>
          </Avatar>

          <div className="text-center">
            <h2 className="text-2xl font-bold">{user?.name}</h2>

            <div className="flex items-center gap-2 text-muted">
              <Envelope className="size-5" />
              <span>{user?.email}</span>
            </div>
          </div>
        </Card.Content>

        <Card.Footer>
          <UpdateProfileModal user={user} />
        </Card.Footer>
      </Card>
    </div>
  );
};

export default MyProfile;
