# Lanrith — Your homelab’s first hop.

> Open source · In development

[Lanrith website](https://lanrith.com/)

An immutable router & edge OS for your homelab.

Read-only at its core. Built and signed by you.

## A read-only core. Change on your terms.

### A verified, read-only system.

dm-verity checks filesystem contents as they’re read, helping detect tampering. Leases, logs and service data use separate writable storage.

The read-only system image contains the OS and configuration. Service state—leases, logs and data—stays writable.

### Your configuration. Your keys.

Your network configuration lives in Git. You build and sign the OS and configuration as one image, using keys you control.

Image preparation:

1. Your repository: Git configuration.
2. Your keys: build and sign.
3. Versioned image: signed image.

### Updates with a boot fallback.

Each signed update is staged in the inactive slot. The accepted image stays the default until the update passes its boot checks.

To roll back deliberately, rebuild reviewed inputs and sign a new deployment.

The update illustration shows two slots: accepted image A and signed candidate B. While B is staged, A remains the current default. If the candidate fails its boot checks, boot fallback can return to the accepted image. The failed candidate does not become the default.

Built on Debian, systemd & mkosi.

## For the house. And the lab.

A new service to try. A houseful of devices to keep connected.

### One networking stack.

Routing, firewall, DNS, DHCP, IPv4 and IPv6 work together out of the box, with their defaults configured as one system.

### Separate networks. Shared services.

Share mDNS/DNS-SD service discovery across the networks you choose, alongside firewall rules that control access.

### Connect IPv4 and IPv6 services.

NAT64/NAT46 connects supported IPv4 and IPv6 services across your network.

### See what’s happening. Change it in Git.

The local console explains devices, connections and policy decisions. Router configuration stays in Git.

## Follow the first hop.

Explore the code and follow project updates on GitHub.

[Follow on GitHub](https://github.com/Lanrith)
